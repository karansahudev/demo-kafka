package in.capofila.userservice.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.kinesis.KinesisClient;
import software.amazon.awssdk.services.kinesis.model.PutRecordRequest;
import software.amazon.awssdk.services.kinesis.model.PutRecordResponse;

@Service
public class KinesisService {

    @Autowired
    private KinesisClient kinesisClient;

    @Value("${aws.kinesis.stream-name}")
    private String streamName;

    public void sendEvent(String partitionKey, String data) {
        // Validate and convert the data to the correct type
        SdkBytes sdkBytes = SdkBytes.fromUtf8String(data);

        // Build the request
        PutRecordRequest request = PutRecordRequest.builder()
                .streamName(streamName)
                .partitionKey(partitionKey)
                .data(sdkBytes)
                .build();

        // Send the request
        PutRecordResponse response = kinesisClient.putRecord(request);
        System.out.println("Record sent with sequence number: " + response.sequenceNumber());
    }
}

package in.capofila.userservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.kinesis.KinesisClient;

import java.net.URI;

@Configuration
public class AwsKinesisConfig {

    @Value("${aws.kinesis.region}")
    private String region;

    @Value("${aws.kinesis.profile:default}")
    private String profile;
    @Value("${localstack.kinesis.endpoint}")
    private URI localStackKinesisEndpoint;
    @Bean
    public KinesisClient kinesisClient() {
        return KinesisClient.builder()
                .region(Region.of(region))
//                .credentialsProvider(ProfileCredentialsProvider.builder()
//                        .profileName(profile)
//                        .build())
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create("accessKey", "secretKey")))
                .httpClient(ApacheHttpClient.builder().build())
                .endpointOverride(localStackKinesisEndpoint)
                .build();
    }
}


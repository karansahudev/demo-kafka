package in.capofila.userservice.controller;



import in.capofila.userservice.services.KinesisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kinesis")
public class KinesisController {

    @Autowired
    private KinesisService kinesisService;

    @GetMapping("/send")
    public String sendEvent(@RequestParam String partitionKey, @RequestParam String data) {
        kinesisService.sendEvent(partitionKey, data);
        return "Event sent to Kinesis!";
    }
}


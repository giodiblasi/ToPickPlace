package topickplace.webapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import topickplace.core.services.IsAliveService;

@RestController
@RequestMapping("/guest")
public class GuestController {

    @Autowired
    private final IsAliveService isAliveService;

    public GuestController(IsAliveService isAliveService){
        this.isAliveService = isAliveService;
    }

    @RequestMapping("/isalive")
    public String IsAlive() {
        return isAliveService.IsAlive() ? "Still Alive" : "No!";
    }
}
package seatassigner.seatassignerapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/guest")
public class GuestController {

    @RequestMapping("/isalive")
    public String IsAlive() {
        return "Still Alive";
    }
}
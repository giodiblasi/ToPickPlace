package topickplace.webapi.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import topickplace.core.models.Event;
import topickplace.core.services.event.CreateEvent;

@RestController
@RequestMapping("/event")
public class EventController{
    
    @Autowired
    private final CreateEvent createEvent;

    public EventController(CreateEvent createEvent){
        this.createEvent = createEvent;
    }


    @RequestMapping(method = RequestMethod.POST)
    public Event CreateEvent(String name){
        return createEvent.Execute(name);
    }
}
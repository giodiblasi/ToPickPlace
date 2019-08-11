package topickplace.webapi.controllers;

import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

    @Async()
    @RequestMapping(method = RequestMethod.POST)
    public Future<Event> CreateEvent(String name){
        return (createEvent.Execute(name)).thenApply(result -> {
            if(result.isRight()) return result.get();
            throw new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, result.getLeft());
        });
        
    }
}
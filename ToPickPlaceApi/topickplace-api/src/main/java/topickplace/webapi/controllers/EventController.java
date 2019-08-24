package topickplace.webapi.controllers;

import java.util.List;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import topickplace.core.models.Event;
import topickplace.core.models.EventSummary;
import topickplace.core.services.event.CreateEvent;
import topickplace.core.services.event.GetEvent;

@RestController
@RequestMapping("/event")
public class EventController{
    
    @Autowired
    private final CreateEvent createEvent;

    @Autowired
    private final GetEvent getEvent;

    public EventController(
            CreateEvent createEvent,
            GetEvent getEvent){
        this.createEvent = createEvent;
        this.getEvent = getEvent;
    }

    @Async()
    @RequestMapping(method = RequestMethod.POST)
    public Future<Event> CreateEvent(String name){
        return createEvent.Execute(name)
        .thenApply(
            result->result.getOrElseThrow(
                message->new ResponseStatusException(HttpStatus.BAD_REQUEST, message)));
    }

    @Async()
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Future<Event> GetEvent(@PathVariable("id") String id){
        return getEvent
            .GetEventById(id)
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public Future<Event> RemoveEvent(@PathVariable("id") String id){
        return getEvent
            .GetEventById(id)
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value="/summary", method = RequestMethod.GET)
    public Future<List<EventSummary>> GetSummary(){
        return getEvent
            .GetSummary()
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, message)));
    }
}
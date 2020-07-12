package topickplace.webapi.controllers;

import java.util.List;
import java.util.concurrent.Future;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import topickplace.core.models.Event;
import topickplace.core.models.EventMap;
import topickplace.core.models.EventSummary;
import topickplace.core.repositories.IEventRepository;

import topickplace.core.validators.EventMapValidator;
import topickplace.core.validators.EventValidator;


@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    private final IEventRepository eventRepository;

    @InitBinder("event")
    protected void initBinder(WebDataBinder binder) {
        binder.setValidator(new EventValidator());
    }

    @InitBinder("eventMap")
    protected void initBinderMap(WebDataBinder binder) {
        binder.setValidator(new EventMapValidator());
    }

    public EventController(IEventRepository eventRepo) {
        this.eventRepository = eventRepo;
    }

    @Async()
    @RequestMapping(method = RequestMethod.POST)
    public Future<Event> CreateEvent(@Valid @RequestBody Event event) {
        return eventRepository.CreateEvent(event).thenApply(result -> result
                .getOrElseThrow(message -> new ResponseStatusException(HttpStatus.BAD_REQUEST, message)));
    }

    @Async()
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Future<Event> GetEvent(@PathVariable("id") String id) {
        return eventRepository.GetEvent(id).thenApply(
                result -> result.getOrElseThrow(message -> new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Future<String> RemoveEvent(@PathVariable("id") String id) {
        return eventRepository.RemoveEvent(id).thenApply(
                result -> result.getOrElseThrow(message -> new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Future<String> UpdateEvent(@PathVariable("id") String id, @RequestBody Event event) {
        return eventRepository.UpdateEvent(id, event).thenApply(
                result -> result.getOrElseThrow(message -> new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value = "/{id}/map", method = RequestMethod.PUT)
    public Future<String> UpdateMap(@Valid @RequestBody EventMap eventMap, @PathVariable("id") String id) {
        return eventRepository.UpdatEventMap(id, eventMap).thenApply(
                result -> result.getOrElseThrow(message -> new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value = "/summary", method = RequestMethod.GET)
    public Future<List<EventSummary>> GetSummary() {
        return eventRepository.GetSummary().thenApply(result -> result
                .getOrElseThrow(message -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, message)));
    }
}
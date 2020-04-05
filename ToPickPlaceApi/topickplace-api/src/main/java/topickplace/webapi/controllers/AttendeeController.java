package topickplace.webapi.controllers;

import java.util.List;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import topickplace.core.models.Attendee;
import topickplace.core.repositories.IAttendeeRepository;

@RestController
@RequestMapping("/event/{eventId}/attendee")
public class AttendeeController{
    
    @Autowired IAttendeeRepository attendeeRepository;

    public AttendeeController(IAttendeeRepository attendeeRepository){
        this.attendeeRepository = attendeeRepository;
    }

    @Async()
    @RequestMapping(method = RequestMethod.GET)
    public Future<List<Attendee>> GetTopics(@PathVariable("eventId") String eventId){
        return attendeeRepository
            .GetAll(eventId)
            .thenApply( result->result.getOrElseThrow(
                message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(method = RequestMethod.POST)
    public Future<Attendee> CreateTopic(@PathVariable("eventId") String eventId, @RequestBody Attendee attendee){
        return attendeeRepository.CreateAttendee(eventId, attendee)
        .thenApply(
            result->result.getOrElseThrow(
                message->new ResponseStatusException(HttpStatus.BAD_REQUEST, message)));
    }

    @Async()
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Future<Attendee> GetTopic(@PathVariable("eventId") String eventId, @PathVariable("id") String id){
        return attendeeRepository
            .GetAttendee(eventId, id)
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public Future<String> RemoveTopic(@PathVariable("eventId") String eventId, @PathVariable("id") String id){
        return attendeeRepository
            .RemoveAttendee(eventId, id)
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }
}
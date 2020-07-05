package topickplace.webapi.controllers;

import java.util.List;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import topickplace.core.models.Topic;
import topickplace.core.services.topic.CreateTopic;
import topickplace.core.services.topic.GetTopic;
import topickplace.core.services.topic.RemoveTopic;
import topickplace.core.services.topic.UpdateTopic;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/event/{eventId}/topic")
public class TopicController{
    
    @Autowired private final GetTopic getTopic;
    @Autowired private final CreateTopic createTopic;
    @Autowired private final RemoveTopic removeTopic;
    @Autowired private final UpdateTopic updateTopic;
    

    public TopicController(GetTopic getTopic, CreateTopic createTopic, RemoveTopic removeTopic, UpdateTopic updateTopic){
        this.getTopic = getTopic;
        this.createTopic = createTopic;
        this.removeTopic = removeTopic;
        this.updateTopic = updateTopic;
    }

    @Async()
    @RequestMapping(method = RequestMethod.GET)
    public Future<List<Topic>> GetTopics(@PathVariable("eventId") String eventId){
        return getTopic.GetAll(eventId);
    }

    @Async()
    @RequestMapping(method = RequestMethod.POST)
    public Future<Topic> CreateTopic(@PathVariable("eventId") String eventId,@RequestBody Topic topic){
        return createTopic.Create(eventId, topic)
        .thenApply(
            result->result.getOrElseThrow(
                message->new ResponseStatusException(HttpStatus.BAD_REQUEST, message)));
    }

    @Async()
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Future<Topic> GetTopic(@PathVariable("eventId") String eventId, @PathVariable("id") String id){
        return getTopic
            .GetTopicById(eventId, id)
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public Future<String> RemoveTopic(@PathVariable("eventId") String eventId, @PathVariable("id") String id){
        return removeTopic
            .Execute(eventId, id)
            .thenApply(
                result->result.getOrElseThrow(
                    message->new ResponseStatusException(HttpStatus.NOT_FOUND, message)));
    }

    @Async()
    @RequestMapping(method = RequestMethod.PUT)
    public Future<String> UpdateTopic(@PathVariable("eventId") String eventId,@RequestBody Topic topic){
        return updateTopic.Update(eventId, topic)
        .thenApply(
            result->result.getOrElseThrow(
                message->new ResponseStatusException(HttpStatus.BAD_REQUEST, message)));
    }
}
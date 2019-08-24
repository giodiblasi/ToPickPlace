package topickplace.webapi.controllers;

import java.util.List;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import topickplace.core.models.Topic;
import topickplace.core.services.topic.GetTopic;

@RestController
@RequestMapping("/event/{eventId}/topic")
public class TopicController{
    
    @Autowired
    private final GetTopic getTopic;

    public TopicController(GetTopic getTopic){
        this.getTopic = getTopic;
    }

    @Async()
    @RequestMapping(method = RequestMethod.GET)
    public Future<List<Topic>> GetTopics(@PathVariable("eventId") String eventId){
        return getTopic.GetAll(eventId);
    }
}
package topickplace.core.services.topic;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import topickplace.core.models.Topic;
import topickplace.core.repositories.ITopicRepository;

@Service
public class GetTopic {
    @Autowired
    private final ITopicRepository topicRepository;

    public GetTopic(ITopicRepository topicRepository){
        this.topicRepository = topicRepository;
    }
    
    public CompletableFuture<List<Topic>> GetAll(String eventId){
        return topicRepository
        .GetTopics(eventId);
    };
}

package topickplace.core.services.topic;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.repositories.ITopicRepository;

@Service
public class RemoveTopic {
    
    @Autowired
    private final ITopicRepository topicRepository;

    public RemoveTopic(ITopicRepository eventRepository){
        this.topicRepository = eventRepository;
    }
    
    public CompletableFuture<Either<String,String>> Execute(String eventId, String topicId){
         return topicRepository.RemoveTopic(eventId, topicId);
    }

}

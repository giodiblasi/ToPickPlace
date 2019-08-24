
package topickplace.core.services.topic;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Topic;
import topickplace.core.repositories.ITopicRepository;

@Service
public class CreateTopic {
    @Autowired
    private final ITopicRepository topicRepository;

    public CreateTopic(ITopicRepository topicRepository){
        this.topicRepository = topicRepository;
    }
    
    public CompletableFuture<Either<String,Topic>> Create(String eventId, Topic topic){
        return topicRepository
        .CreateTopic(eventId, topic);
    };
}

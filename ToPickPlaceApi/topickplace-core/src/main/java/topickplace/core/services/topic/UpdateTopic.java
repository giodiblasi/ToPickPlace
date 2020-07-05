
package topickplace.core.services.topic;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Topic;
import topickplace.core.repositories.ITopicRepository;

@Service
public class UpdateTopic {
    @Autowired
    private final ITopicRepository topicRepository;

    public UpdateTopic(ITopicRepository topicRepository){
        this.topicRepository = topicRepository;
    }
    
    public CompletableFuture<Either<String,String>> Update(String eventId, Topic topic){
        return topicRepository
        .UpdateTopic(eventId, topic);
    };
}

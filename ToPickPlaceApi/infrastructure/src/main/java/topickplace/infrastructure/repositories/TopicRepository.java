package topickplace.infrastructure.repositories;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.models.Topic;
import topickplace.core.repositories.ITopicRepository;
import topickplace.infrastructure.firebase.IFirestoreRepoFactory;
import topickplace.infrastructure.firebase.IRepository;

@Service
public class TopicRepository implements ITopicRepository {

    @Autowired
    private IFirestoreRepoFactory repoFactory;

    @Override
    public CompletableFuture<List<Topic>> GetTopics(String eventID) {
        return GetRepo(eventID)
                .GetAll()
                .thenApply(result -> result.getOrElse(new LinkedList<Topic>()));
    }

    @Override
    public CompletableFuture<Either<String, Topic>> GetTopic(String eventID, String topicID) {
        return GetRepo(eventID).GetById(topicID);
    }

    @Override
    public CompletableFuture<Either<String, Topic>> CreateTopic(String eventId, Topic topic) {
        return GetRepo(eventId).Save(topic);
    }

    @Override
    public CompletableFuture<Either<String, String>> RemoveTopic(String eventId, String topicId) {
        return GetRepo(eventId).RemoveById(topicId);
    }
    
    @Override
    public CompletableFuture<Either<String, String>> UpdateTopic(String eventId, Topic topic) {
        return GetRepo(eventId).Update(eventId, topic);
    }

    private IRepository<Topic> GetRepo(String eventId) {
        return repoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Topic.class);
    }
}
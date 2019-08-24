package topickplace.infrastructure.repositories;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import topickplace.core.models.Topic;
import topickplace.core.repositories.ITopicRepository;
import topickplace.infrastructure.firebase.IFirestoreRepoFactory;

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

    private IRepository<Topic> GetRepo(String eventId){
        return repoFactory
            .FromDocument("Events", eventId)
            .GetRepo(Topic.class, "Topics");
    }

}
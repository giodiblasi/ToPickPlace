package topickplace.infrastructure.repositories;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import javax.annotation.PostConstruct;

import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteBatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Attendee;
import topickplace.core.models.Event;
import topickplace.core.models.Topic;
import topickplace.core.repositories.ITopicRepository;
import topickplace.infrastructure.firebase.CollectionMap;
import topickplace.infrastructure.firebase.Firebase;
import topickplace.infrastructure.firebase.IFirestoreRepoFactory;
import topickplace.infrastructure.firebase.IRepository;

@Service
public class TopicRepository implements ITopicRepository {

    @Autowired
    private IFirestoreRepoFactory repoFactory;

    @Autowired
    private Firebase firebase;
    private Firestore db;

    @PostConstruct
    public void Init() {
        db = firebase.GetFirestore();
    }

    @Override
    public CompletableFuture<List<Topic>> GetTopics(String eventID) {
        return GetRepo(eventID).GetAll().thenApply(result -> result.getOrElse(new LinkedList<Topic>()));
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
        return CompletableFuture.supplyAsync(() -> {
            try {
                WriteBatch batch = db.batch();
                var eventRef = db.collection(CollectionMap.Get(Event.class)).document(eventId);
                batch.delete(eventRef.collection(CollectionMap.Get(Topic.class)).document(topicId));
                eventRef.collection(CollectionMap.Get(Attendee.class)).listDocuments().forEach(attendeeRef -> {
                    batch.update(attendeeRef, "topics", FieldValue.arrayRemove(topicId));
                });
                batch.commit().get();
                return Either.right(topicId);
            } catch (Exception ex) {
                return Either.left(ex.getMessage());
            }
        });
    }

    @Override
    public CompletableFuture<Either<String, String>> UpdateTopic(String eventId, Topic topic) {
        return GetRepo(eventId).Update(topic.getId(), topic);
    }

    private IRepository<Topic> GetRepo(String eventId) {
        return repoFactory.FromDocument(Event.class, eventId).GetRepo(Topic.class);
    }
}
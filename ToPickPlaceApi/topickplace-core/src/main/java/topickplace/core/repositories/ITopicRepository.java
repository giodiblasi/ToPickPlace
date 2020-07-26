package topickplace.core.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;
import topickplace.core.models.Topic;

public interface ITopicRepository {
    CompletableFuture<List<Topic>> GetTopics(String eventID);
    CompletableFuture<Either<String,Topic>> GetTopic(String eventID, String topicID);
    CompletableFuture<Either<String,Topic>> CreateTopic(String eventId, Topic event);
    CompletableFuture<Either<String,String>> RemoveTopic(String eventId, String id);
    CompletableFuture<Either<String,String>> UpdateTopic(String eventId, Topic topic);
}
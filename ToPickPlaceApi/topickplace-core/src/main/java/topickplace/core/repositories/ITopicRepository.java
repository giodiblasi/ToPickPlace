package topickplace.core.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import topickplace.core.models.Topic;

public interface ITopicRepository {
    CompletableFuture<List<Topic>> GetTopics(String eventID);
}
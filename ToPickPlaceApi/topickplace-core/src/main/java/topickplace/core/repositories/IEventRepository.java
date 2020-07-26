package topickplace.core.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.models.EventMap;
import topickplace.core.models.EventSummary;

public interface IEventRepository{
    CompletableFuture<Either<String,Event>> CreateEvent(Event event);
    CompletableFuture<Either<String,Event>> GetEvent(String id);
    CompletableFuture<Either<String,String>> RemoveEvent(String id);
    CompletableFuture<Either<String,List<Event>>> GetAll();
    CompletableFuture<Either<String,List<EventSummary>>> GetSummary();
    CompletableFuture<Either<String,List<Event>>> GetAll(String... fields);
    CompletableFuture<Either<String,String>> UpdateEvent(String id, Event event);
    CompletableFuture<Either<String, String>> UpdatEventMap(String id, EventMap map);
}
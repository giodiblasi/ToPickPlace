package topickplace.core.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;
import topickplace.core.models.Event;

public interface IEventRepository{
    CompletableFuture<Either<String,Event>> CreateEvent(Event event);
    CompletableFuture<Either<String,Event>> GetEvent(String id);
    CompletableFuture<Either<String,String>> RemoveEvent(String id);
    CompletableFuture<Either<String,List<Event>>> GetAll();
    CompletableFuture<Either<String,List<Event>>> GetAll(String... fields);

}
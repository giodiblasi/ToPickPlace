package topickplace.core.repositories;

import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;
import topickplace.core.models.Event;

public interface IEventRepository{
    CompletableFuture<Either<String,Event>> CreateEvent(Event event);
}
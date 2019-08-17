package topickplace.infrastructure.repositories;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;

@Service
public class EventRepository implements IEventRepository{

    @Autowired
    private final IRepository<Event> repository;

    public EventRepository(IRepository<Event> repository){
        this.repository = repository;
    }

    public CompletableFuture<Either<String,Event>> CreateEvent(Event event) {
        return repository.Save(event);
    }

    public CompletableFuture<Either<String,Event>> GetEvent(String id) {
        return repository.GetById(id);
    }

}
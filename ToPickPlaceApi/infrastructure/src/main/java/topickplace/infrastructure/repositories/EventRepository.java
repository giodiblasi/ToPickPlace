package topickplace.infrastructure.repositories;

import java.util.List;
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

    public CompletableFuture<Either<String,String>> RemoveEvent(String id) {
        return repository.RemoveById(id);
    }

    public CompletableFuture<Either<String,List<Event>>> GetAll() {
        return repository.GetAll();
    }

    public CompletableFuture<Either<String,List<Event>>> GetAll(String... fields) {
        return repository.GetAll(fields);
    }



}
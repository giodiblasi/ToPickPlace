package topickplace.infrastructure.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.models.EventMap;
import topickplace.core.models.EventSummary;
import topickplace.core.repositories.IEventRepository;
import topickplace.infrastructure.firebase.IFirestoreRepoFactory;
import topickplace.infrastructure.firebase.IRepository;

@Service
public class EventRepository implements IEventRepository {

    @Autowired
    private IFirestoreRepoFactory firestoreRepoFactory;

    private IRepository<Event> repository;

    @PostConstruct
    public void Init() {
        repository = firestoreRepoFactory.GetRepo(Event.class);
    }

    public CompletableFuture<Either<String, Event>> CreateEvent(Event event) {
        return repository.Save(event);
    }

    public CompletableFuture<Either<String, Event>> GetEvent(String id) {
        return repository.GetById(id);
    }

    public CompletableFuture<Either<String, String>> RemoveEvent(String id) {
        return repository.RemoveById(id);
    }

    public CompletableFuture<Either<String, List<Event>>> GetAll() {
        return repository.GetAll();
    }

    public CompletableFuture<Either<String, List<Event>>> GetAll(String... fields) {
        return repository.GetAll(fields);
    }

    @Override
    public CompletableFuture<Either<String, String>> UpdateEvent(String id, Event event) {
        return repository.Update(id, event);
    }

    @Override
    public CompletableFuture<Either<String, String>> UpdatEventMap(String id, EventMap map) {
        return repository.UpdateField(id, "eventMap", map);
    }

    @Override
    public CompletableFuture<Either<String, List<EventSummary>>> GetSummary() {
        return GetAll("id", "name")
                .thenApply(result -> result.map(events -> events
                            .stream()
                            .map(event -> new EventSummary(event.getId(), event.getName()))
                            .collect(Collectors.toList())));
    }
}
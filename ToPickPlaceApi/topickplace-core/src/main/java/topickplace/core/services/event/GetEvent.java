package topickplace.core.services.event;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.models.EventSummary;
import topickplace.core.repositories.IEventRepository;

@Service
public class GetEvent {
    @Autowired
    private final IEventRepository eventRepository;

    public GetEvent(IEventRepository eventRepository){
        this.eventRepository = eventRepository;
    }
    
    public CompletableFuture<Either<String,Event>> GetEventById(String id){
         return eventRepository
         .GetEvent(id);
    }

    public CompletableFuture<Either<String,List<Event>>> GetAll(){
        return eventRepository
        .GetAll();
    }

    public CompletableFuture<Either<String,List<EventSummary>>> GetSummary(){
        return eventRepository
        .GetAll("id", "name")
        .thenApply(
            result->result.map(
                events->events
                    .stream()
                    .map(event->new EventSummary(event.getId(), event.getName()))
                    .collect(Collectors.toList())));
    }

}

package topickplace.core.services.event;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;

@Service
public class GetEvent {
    @Autowired
    private final IEventRepository eventRepository;

    public GetEvent(IEventRepository eventRepository){
        this.eventRepository = eventRepository;
    }
    
    public CompletableFuture<Either<String,Event>> Execute(String id){
         return eventRepository
         .GetEvent(id);
    }

}

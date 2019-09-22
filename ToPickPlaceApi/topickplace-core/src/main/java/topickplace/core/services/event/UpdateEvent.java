package topickplace.core.services.event;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;

@Service
public class UpdateEvent {
    
    @Autowired
    private final IEventRepository eventRepository;

    public UpdateEvent(IEventRepository eventRepository){
        this.eventRepository = eventRepository;
    }
    
    public CompletableFuture<Either<String,String>> Execute(String id, Event event){
         return eventRepository.UpdateEvent(id, event);
    }

}

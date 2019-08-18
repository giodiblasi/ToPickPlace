package topickplace.core.services.event;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.repositories.IEventRepository;

@Service
public class RemoveEvent {
    
    @Autowired
    private final IEventRepository eventRepository;

    public RemoveEvent(IEventRepository eventRepository){
        this.eventRepository = eventRepository;
    }
    
    public CompletableFuture<Either<String,String>> Execute(String id){
         return eventRepository.RemoveEvent(id);
    }

}

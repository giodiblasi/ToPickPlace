package topickplace.core.services.event;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.EventMap;
import topickplace.core.repositories.IEventRepository;

@Service
public class UpdateEventMap {
    @Autowired
    private final IEventRepository eventRepository;
    
    public UpdateEventMap(IEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    
    public CompletableFuture<Either<String,String>> Execute(String id, EventMap map){
        return eventRepository.UpdatEventMap(id, map);
   }

   
}
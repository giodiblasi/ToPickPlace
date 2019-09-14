package topickplace.core.services.event;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;

@Service
public class CreateEvent {
    @Autowired
    private final IEventRepository eventRepository;

    public CreateEvent(IEventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    public CompletableFuture<Either<String,Event>> Execute(Event event){
        return EventValidator
        .Validate(event)
        .map(validEvent-> eventRepository.CreateEvent(validEvent))
        .orElse( -> ""/*Joins messages*/);
        
    }

}

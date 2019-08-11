package topickplace.core.services.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;

@Service
public class CreateEvent {
    @Autowired
    private final IEventRepository eventRepository;

    public CreateEvent(IEventRepository eventRepository){
        this.eventRepository = eventRepository;
    }
    public Event Execute(String eventName){
        Event event = new Event();
        event.setName(eventName);
        return eventRepository.CreateEvent(event);
    }
}

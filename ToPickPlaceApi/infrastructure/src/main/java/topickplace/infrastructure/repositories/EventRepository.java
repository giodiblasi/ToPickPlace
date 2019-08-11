package topickplace.infrastructure.repositories;

import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;

public class EventRepository implements IEventRepository {

    @Override
    public Event CreateEvent(Event event) {
        event.setId("id");
        return event;
	}

}
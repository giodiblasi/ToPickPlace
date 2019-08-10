package seatassigner.infrastructure.repositories;

import seatassigner.core.models.Event;
import seatassigner.core.repositories.IEventRepository;

public class EventRepository implements IEventRepository {

    @Override
    public Event CreateEvent(Event event) {
        event.setId("id");
        return event;
	}

}
package seatassigner.core.repositories;
import seatassigner.core.models.Event;

public interface IEventRepository{
    Event CreateEvent(Event event);
}
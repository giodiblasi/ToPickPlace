package topickplace.core.repositories;
import topickplace.core.models.Event;

public interface IEventRepository{
    Event CreateEvent(Event event);
}
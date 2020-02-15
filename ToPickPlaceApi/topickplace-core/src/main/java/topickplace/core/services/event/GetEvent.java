package topickplace.core.services.event;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.models.EventSummary;
import topickplace.core.repositories.IAttendeeRepository;
import topickplace.core.repositories.IEventRepository;
import topickplace.core.repositories.ITopicRepository;

@Service
public class GetEvent {
    @Autowired
    private final IEventRepository eventRepository;

    @Autowired
    private final ITopicRepository topicRepository;

    @Autowired
    private final IAttendeeRepository attendeeRepository;

    public GetEvent(IEventRepository eventRepository, ITopicRepository topicRepository,
            IAttendeeRepository attendeeRepository) {
        this.eventRepository = eventRepository;
        this.topicRepository = topicRepository;
        this.attendeeRepository = attendeeRepository;
    }

    public CompletableFuture<Either<String, Event>> GetEventById(String id) {
        return eventRepository.GetEvent(id).thenApply(result -> result.map(event -> {
            var topics = topicRepository.GetTopics(id).join();
            var attendees = attendeeRepository.GetAll(id).thenApply(res -> res.get()).join();
            event.setTopics(topics);
            event.setAttendees(attendees);
            return event;
        }));
    }

    public CompletableFuture<Either<String, List<Event>>> GetAll() {
        return eventRepository.GetAll();
    }

    public CompletableFuture<Either<String, List<EventSummary>>> GetSummary() {
        return eventRepository.GetAll("id", "name").thenApply(result -> result.map(events -> events.stream()
                .map(event -> new EventSummary(event.getId(), event.getName())).collect(Collectors.toList())));
    }

}

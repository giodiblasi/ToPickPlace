package topickplace.infrastructure.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Attendee;
import topickplace.core.models.Event;
import topickplace.core.repositories.IAttendeeRepository;
import topickplace.infrastructure.firebase.IFirestoreRepoFactory;
import topickplace.infrastructure.firebase.IRepository;

@Service
public class AttendeeRepository implements IAttendeeRepository{

    @Autowired
    private IFirestoreRepoFactory firestoreRepoFactory;
    private IRepository<Event> eventRepo;

    @PostConstruct
    public void init(){
        eventRepo = firestoreRepoFactory.GetRepo(Event.class);
    }
    
    public CompletableFuture<Either<String,Attendee>> CreateAttendee(String eventId, Attendee attendee) {
        return null;
    }

    public CompletableFuture<Either<String,Attendee>> GetAttendee(String eventId, String id) {
        return null;
    }

    public CompletableFuture<Either<String,String>> RemoveAttendee(String eventId, String id) {
        return null;
    }

    public CompletableFuture<Either<String,List<Attendee>>> GetAll(String eventId) {
        return eventRepo
            .GetById(eventId)
            .thenApply(eventFuture -> 
                            eventFuture.map(event -> 
                                event.getAttendees()));
    }
}
package topickplace.infrastructure.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Attendee;
import topickplace.core.models.Event;
import topickplace.core.repositories.IAttendeeRepository;
import topickplace.infrastructure.firebase.IFirestoreRepoFactory;

@Service
public class AttendeeRepository implements IAttendeeRepository{

    @Autowired
    private IFirestoreRepoFactory firestoreRepoFactory;
    
    public CompletableFuture<Either<String,Attendee>> CreateAttendee(String eventId, Attendee attendee) {
        return firestoreRepoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Attendee.class)
            .Save(attendee);
    }

    public CompletableFuture<Either<String,Attendee>> GetAttendee(String eventId, String id) {
        return firestoreRepoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Attendee.class)
            .GetById(id);
    }

    public CompletableFuture<Either<String,String>> RemoveAttendee(String eventId, String id) {
        return firestoreRepoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Attendee.class)
            .RemoveById(id);
    }

    public CompletableFuture<Either<String,List<Attendee>>> GetAll(String eventId) {
        return firestoreRepoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Attendee.class)
            .GetAll();
    }

    @Override
    public CompletableFuture<Either<String, List<Attendee>>> GetAttendeesWithTopic(String eventId, String topic) {
        return firestoreRepoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Attendee.class)
            .GetAllContainingValueInArray("topics", topic);
    }

    public CompletableFuture<Either<String,String>> UpdateAttendee(String eventId, Attendee attendee) {
        return firestoreRepoFactory
            .FromDocument(Event.class, eventId)
            .GetRepo(Attendee.class)
            .Update(attendee.getId(), attendee);
    }

    
}
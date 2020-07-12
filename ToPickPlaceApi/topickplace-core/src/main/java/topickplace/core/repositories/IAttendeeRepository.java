package topickplace.core.repositories;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import io.vavr.control.Either;
import topickplace.core.models.Attendee;

public interface IAttendeeRepository{
    CompletableFuture<Either<String,Attendee>> CreateAttendee(String eventId, Attendee attendee);
    CompletableFuture<Either<String,Attendee>> GetAttendee(String eventId, String id);
    CompletableFuture<Either<String,String>> RemoveAttendee(String eventId, String id);
    CompletableFuture<Either<String,List<Attendee>>> GetAll(String eventId);
    CompletableFuture<Either<String,String>> UpdateAttendee(String eventId, Attendee attendee);
    CompletableFuture<Either<String,List<Attendee>>> GetAttendeesWithTopic(String eventId, String topic);
}
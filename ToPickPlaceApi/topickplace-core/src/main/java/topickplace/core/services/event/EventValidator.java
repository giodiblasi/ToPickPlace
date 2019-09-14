package topickplace.core.services.event;

import java.text.MessageFormat;
import java.util.List;
import java.util.stream.Collectors;

import io.vavr.control.Either;
import topickplace.core.models.Event;

public class EventValidator{
    public static Either<List<String>, Event> Validate(Event event){
        var eventMap  =event.getEventMap();
        var messages = eventMap
            .getAvailableSeats()
            .stream()
            .filter(seat->seat.getRow() >= eventMap.getHeigth() || 
                          seat.getColumn() >= eventMap.getWidth())
            .map(seat-> MessageFormat.format("Not valid position ({0},{1}", seat.getRow(), seat.getColumn()))
            .collect(Collectors.toList());

        return messages.isEmpty() 
            ? Either.right(event)
            : Either.left(messages);
    }
}
package topickplace.core.validators;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import topickplace.core.models.Event;

public class EventValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return Event.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Event event = (Event) target;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "field.required");
        var eventMap = event.getEventMap();
        eventMap
            .getAvailableSeats()
            .stream()
            .filter(seat -> seat.getRow() >= eventMap.getHeigth() ||
                        seat.getColumn() >= eventMap.getWidth())
            .forEach(seat -> errors.rejectValue("eventMap.availableSeats", "not.valid.seat.position"));
    }
}
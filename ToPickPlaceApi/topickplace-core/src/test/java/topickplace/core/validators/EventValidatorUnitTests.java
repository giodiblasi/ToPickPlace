package topickplace.core.validators;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;

import topickplace.core.models.Event;
import topickplace.core.models.EventMap;
import topickplace.core.models.SeatPosition;

@RunWith(SpringRunner.class)
public class EventValidatorUnitTests {
    
    @Test
    public void ValidEvent(){
        var event = BuildValidEvent();

        var validator = new EventValidator();
        Errors errors = new BeanPropertyBindingResult(event, "validEvent");
        validator.validate(event, errors);

        Assert.assertFalse(errors.hasErrors());
    }

    @Test
    public void NotValidEvent(){
        var event = BuildNotValidEvent();

        var validator = new EventValidator();
        Errors errors = new BeanPropertyBindingResult(event, "validEvent");
        validator.validate(event, errors);

        Assert.assertEquals(2, errors.getErrorCount());
        Assert.assertEquals("field.required", errors.getFieldError("name").getCode());
        Assert.assertEquals("not.valid.seat.position", errors.getFieldError("eventMap.availableSeats").getCode());

    }

    private Event BuildNotValidEvent(){
        var event = new Event();
        event.setName("");
        EventMap eventMap = new EventMap();
        eventMap.setHeigth(4);
        eventMap.setWidth(4);
        eventMap.setAvailableSeats(List.of(new SeatPosition(5,5)));
        event.setEventMap(eventMap);
        return event;
    }

    private Event BuildValidEvent(){
        var event = new Event();
        event.setName("event");
        EventMap eventMap = new EventMap();
        eventMap.setHeigth(4);
        eventMap.setWidth(4);
        eventMap.setAvailableSeats(List.of(new SeatPosition(2,2)));
        event.setEventMap(eventMap);
        return event;
    }
}
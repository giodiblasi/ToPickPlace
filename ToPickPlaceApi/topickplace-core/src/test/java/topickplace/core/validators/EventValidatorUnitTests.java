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
        Assert.assertEquals(3, errors.getErrorCount());
        Assert.assertEquals("field.required", errors.getFieldError("name").getCode());
        Assert.assertEquals("not.valid.seats.length", errors.getFieldError("eventMap.availableSeats").getCode());

    }

    private Event BuildNotValidEvent(){
        var event = new Event();
        event.setName("");
        EventMap eventMap = new EventMap();
        eventMap.setHeigth(2);
        eventMap.setWidth(2);
        eventMap.setAvailableSeats(List.of(3));
        event.setEventMap(eventMap);
        return event;
    }

    private Event BuildValidEvent(){
        var event = new Event();
        event.setName("event");
        EventMap eventMap = new EventMap();
        eventMap.setHeigth(2);
        eventMap.setWidth(2);
        eventMap.setAvailableSeats(List.of(1,0,0,1));
        event.setEventMap(eventMap);
        return event;
    }
}
package topickplace.core.validators;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import topickplace.core.models.EventMap;

public class EventMapValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        return EventMap.class.equals(clazz);
    }

    private void innerValidation(String field, Object target, Errors errors){
        var prefix = field.isEmpty() ? "" : field+".";
        EventMap eventMap = (EventMap) target;
        if(eventMap.getAvailableSeats().size()!=eventMap.getHeigth()*eventMap.getWidth()){
            errors.rejectValue(prefix+"availableSeats", "not.valid.seats.length");
        }
        eventMap
            .getAvailableSeats()
            .stream()
            .filter(seat->(seat!=1 && seat!=0))
            .forEach(seat->errors.rejectValue(prefix+"availableSeats", "not.valid.seat.position"));
    }

    @Override
    public void validate(Object target, Errors errors) {
        innerValidation("", target, errors);
    }
       
    public void validate(String field, Object target, Errors errors) {
        innerValidation(field, target, errors);
    }
}
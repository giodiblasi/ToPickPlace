package topickplace.core.models;

import java.util.List;

public class EventMap{
    private Integer width;
    private Integer heigth;
    private List<Integer> availableSeats;

    public EventMap(){}
    public Integer getWidth() {
        return width;
    }

    public List<Integer> getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(List<Integer> availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Integer getHeigth() {
        return heigth;
    }

    public void setHeigth(Integer heigth) {
        this.heigth = heigth;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }
}
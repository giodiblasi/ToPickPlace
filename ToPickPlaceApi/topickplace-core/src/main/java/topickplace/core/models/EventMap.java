package topickplace.core.models;

import java.util.List;

public class EventMap{
    private Integer width;
    private Integer heigth;
    private List<SeatPosition> availableSeats;

    public EventMap(){}
    public Integer getWidth() {
        return width;
    }

    public List<SeatPosition> getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(List<SeatPosition> availableSeats) {
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
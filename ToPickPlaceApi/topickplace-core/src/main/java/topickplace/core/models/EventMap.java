package topickplace.core.models;

import java.util.List;

public class EventMap{
    public class SeatPosition{
        private Integer row;
        private Integer column;

        public Integer getRow() {
            return row;
        }

        public Integer getColumn() {
            return column;
        }

        public void setColumn(Integer column) {
            this.column = column;
        }

        public void setRow(Integer row) {
            this.row = row;
        }
    }

    private Integer width;
    private Integer heigth;
    private List<SeatPosition> availableSeats;

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
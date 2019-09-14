package topickplace.core.models;

public class SeatPosition{
    private Integer row;
    private Integer column;

    public SeatPosition(){}

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

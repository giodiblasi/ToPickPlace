package seatassigner.core.models;

public class Event{
    private String Name;
    private String Id;

    public String getName() {
        return Name;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        this.Id = id;
    }

    public void setName(String name) {
        this.Name = name;
    }
}
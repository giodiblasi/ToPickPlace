package topickplace.core.models;

import java.util.List;

public class Event {
    private String Name;
    private String Id;
    private String Location;
    private String Notes;
    private List<Attendee> attendees;

    public String getName() {
        return Name;
    }

    public List<Attendee> getAttendees() {
        return attendees;
    }

    public void setAttendees(List<Attendee> attendees) {
        this.attendees = attendees;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        this.Location = location;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        this.Notes = notes;
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
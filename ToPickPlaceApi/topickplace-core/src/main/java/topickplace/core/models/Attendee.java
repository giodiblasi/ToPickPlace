package topickplace.core.models;

import java.util.List;

public class Attendee {
    private String id;
    private String name;
    private String surname;
    private List<String> topics;

    public String getSurname() {
        return surname;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
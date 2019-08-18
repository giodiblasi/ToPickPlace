package topickplace.core.models;

public class EventSummary{
    private String id;
    private String name;

    public EventSummary(String id, String name){
        this.id  = id;
        this.name = name;
    }
    
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}
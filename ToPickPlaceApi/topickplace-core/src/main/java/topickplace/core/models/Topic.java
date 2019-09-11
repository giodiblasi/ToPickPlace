package topickplace.core.models;
public class Topic{
    private int weigth;
    private String id;
    private String description;
    private String name;

    public int getWeigth() {
        return weigth;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setWeigth(int weigth) {
        this.weigth = weigth;
    }
}
package topickplace.infrastructure.repositories;
public class IdEntry<T>{
    private String id;
    private T data;

    public IdEntry(T data, String id){
        this.data = data;
        this.id = id;
    }

    public T getData() {
        return data;
    }

    public String getId() {
        return id;
    }
}
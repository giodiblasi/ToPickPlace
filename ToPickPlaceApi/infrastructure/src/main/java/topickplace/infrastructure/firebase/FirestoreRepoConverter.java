package topickplace.infrastructure.firebase;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.firestore.DocumentSnapshot;

import io.vavr.control.Either;

@SuppressWarnings({"rawtypes", "unchecked"})
public class FirestoreRepoConverter<T> implements IRepository<T>{
    
    private static final String ID_FIELD_NAME = "id";
    private final FireStoreRepository innerRepo;
    private final Class<T> classType;
    private final Supplier<Class<? extends Map>> mapClassType;

    private Supplier<Class<? extends Map>> mapClassGenerator(){
        Map<String,Object> instanceForClass = new HashMap<String,Object>();
        return ()->instanceForClass.getClass();
    }

    public FirestoreRepoConverter(Class<T> classType, FireStoreRepository repo){
        innerRepo = repo;
        this.classType = classType;
        mapClassType = mapClassGenerator();
    }

    @Override
    public CompletableFuture<Either<String, T>> Save(T data) {
        return innerRepo
            .Save(ToDAO(data))
            .thenApply(result->result.map(dao->FromDAO(dao)));
    }

    @Override
	public CompletableFuture<Either<String, T>> GetById(String id) {
        return innerRepo
        .GetById(id)
        .thenApply(result->result.map(dao->FromDAO(dao)));
    }
    
    @Override
	public CompletableFuture<Either<String, String>> RemoveById(String id) {
        return innerRepo.RemoveById(id);
    }
    
    @Override
	public CompletableFuture<Either<String, List<T>>> GetAll(String... fields) {
        return innerRepo
        .GetAll(fields)
        .thenApply(result-> result.map(items->FromDAO(items)));
    }

    @Override
	public CompletableFuture<Either<String, List<T>>> GetAll() {
        return innerRepo
        .GetAll()
        .thenApply(result-> result.map(items->FromDAO(items)));
    }

    @Override
    public CompletableFuture<Either<String, String>> Update(String id, T data) {
        return innerRepo.Update(id, ToDAO(data));
    }
    
    @Override
    public <FieldType> CompletableFuture<Either<String, String>> UpdateField(String id, String field, FieldType data) {
        return innerRepo.UpdateField(id, field, ToDAO(data));
    }

    @Override
    public CompletableFuture<Either<String, List<T>>> GetAllContainingValueInArray(String arrayField,
                                                                                      String valueToSearch) {
        return innerRepo
                .DocumentsContainingValueInArray(arrayField, valueToSearch)
                .thenApply(result-> result.map(items->FromDAO(items)));
    }
    
    
    public <U> Map<String,Object> ToDAO(U data){
        ObjectMapper mapper = new ObjectMapper();
        Map<String,Object> docMap = mapper.convertValue(data, mapClassType.get());

        docMap.remove(ID_FIELD_NAME);
        return docMap;
    }

    public T FromDAO(DocumentSnapshot document){
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> docMap = document.getData();
        docMap.put(ID_FIELD_NAME, document.getId());
        T data =  mapper.convertValue(docMap, classType);
        return data;
    }

    public List<T> FromDAO(List<DocumentSnapshot> documents){
        return documents
            .stream()
            .map(item->FromDAO(item))
            .collect(Collectors.toList());
    }

    
}
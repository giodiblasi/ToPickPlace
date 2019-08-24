package topickplace.infrastructure.firebase;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;

import org.springframework.scheduling.annotation.Async;


import io.vavr.control.Either;
import topickplace.infrastructure.firebase.Firebase;

public  class  FireStoreRepository{

    CollectionReference collection;
    
    public FireStoreRepository(Firebase firebase, 
                              String collectionName) throws IOException{
        collection = firebase.GetFirestore().collection(collectionName);
    }

    public FireStoreRepository(CollectionReference collection){
        this.collection = collection;
    }
    @Async
    public  CompletableFuture<Either<String,DocumentSnapshot>> Save(Map<String,Object> data){ 
        return CompletableFuture.supplyAsync(() -> {    
            try{
                DocumentReference result = collection.add(data).get();
                return Either.right(result.get().get());
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    @Async
    public CompletableFuture<Either<String, DocumentSnapshot>> GetById(String id) {
        return CompletableFuture.supplyAsync(() -> {
            try{
                DocumentSnapshot entry = collection.document(id).get().get();
                if(!entry.exists()) return Either.left("Data not found for id: "+id);
                return Either.right(entry);
                
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    @Async
    public CompletableFuture<Either<String, String>> RemoveById(String id) {
        return CompletableFuture.supplyAsync(() -> {
            try{
                collection.document(id).delete().get();
                return Either.right(id);
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    @Async
    public CompletableFuture<Either<String, List<DocumentSnapshot>>> GetAll(String... fields) {
        return CompletableFuture.supplyAsync(() -> {
            try{
                return Either.right(GetDocuments(collection.select(fields).get().get().getDocuments()));
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    @Async
    public CompletableFuture<Either<String, List<DocumentSnapshot>>> GetAll() {
        return CompletableFuture.supplyAsync(() -> {
            try{
                return Either.right(GetDocuments(collection.get().get().getDocuments()));
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    private List<DocumentSnapshot> GetDocuments(List<QueryDocumentSnapshot> queryDocuments){
        return queryDocuments
            .stream()
            .map(document->document) //without this we have cast errors
            .collect(Collectors.toList());
    }

}
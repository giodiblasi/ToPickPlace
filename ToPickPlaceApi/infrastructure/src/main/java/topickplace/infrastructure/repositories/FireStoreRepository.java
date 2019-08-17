package topickplace.infrastructure.repositories;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

import org.springframework.scheduling.annotation.Async;


import io.vavr.control.Either;
import topickplace.infrastructure.firebase.Firebase;

public  class  FireStoreRepository{
    
    private final Firestore db;
    CollectionReference collection;
    
    public FireStoreRepository(Firebase firebase, 
                              String collectionName) throws IOException{
        
        db=firebase.GetFirestore();
        collection = db.collection(collectionName);
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


}
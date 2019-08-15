package topickplace.infrastructure.repositories;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;


import org.springframework.scheduling.annotation.Async;

import io.vavr.control.Either;

public  class  FireStoreRepository<T> implements IRepository<T>{
    
    private final Firestore db;
    private final Class<T> typeClass;
    CollectionReference collection;

    public FireStoreRepository(String credentialPath, 
                            String collectionName,
                            Class<T> typeClass) throws IOException{
        this.typeClass = typeClass;
        InputStream serviceAccount = new FileInputStream(credentialPath);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(credentials)
            .build();
        FirebaseApp.initializeApp(options);

        db = FirestoreClient.getFirestore();
        collection = db.collection(collectionName);
        
    }

    @Async
    @Override
    public CompletableFuture<Either<String,IdEntry<T>>> Save(T data){ 
        return CompletableFuture.supplyAsync(() -> {    
            try{
                DocumentReference result = collection.add(data).get();
                ObjectMapper mapper = new ObjectMapper();
                DocumentSnapshot doc = result.get().get();
                T storedData = mapper.convertValue(doc.getData(),typeClass);
                return Either.right(new IdEntry<T>(storedData, doc.getId()));
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    @Async
    @Override
    public CompletableFuture<Either<String, IdEntry<T>>> GetById(String id) {
        return CompletableFuture.supplyAsync(() -> {
            try{
                DocumentSnapshot entry = collection.document(id).get().get();
                if(!entry.exists()) return Either.left("Data not found for id: "+id);
                ObjectMapper mapper = new ObjectMapper();
                T data =  mapper.convertValue(entry.getData(), typeClass);
                return Either.right(new IdEntry<T>(data, id));
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
        

    }


}
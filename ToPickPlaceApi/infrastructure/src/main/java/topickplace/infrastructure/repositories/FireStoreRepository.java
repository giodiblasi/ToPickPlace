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
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;


import org.springframework.scheduling.annotation.Async;

import io.vavr.control.Either;
import topickplace.core.repositories.IRepository;

public  class  FireStoreRepository<T> implements IRepository<T>{
    
    private final Firestore db;
    private final Class<T> typeClass;
    CollectionReference collection;

    public FireStoreRepository(String connString,
                            String credentialPath, 
                            String collectionName,
                            Class<T> typeClass) throws IOException{
        System.out.println("-----PATH----- "+credentialPath);
                        
        this.typeClass = typeClass;
        InputStream serviceAccount = new FileInputStream(credentialPath);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        FirebaseOptions options = new FirebaseOptions.Builder()
            .setCredentials(credentials)
            .setDatabaseUrl(connString)
            .build();
        FirebaseApp.initializeApp(options);

        db = FirestoreClient.getFirestore();
        collection = db.collection(collectionName);
        
    }

    @Async
    @Override
    public CompletableFuture<Either<String,T>> Save(T data){ 
        return CompletableFuture.supplyAsync(() -> {    
            try{
                DocumentReference result = collection.add(data).get();
                ObjectMapper mapper = new ObjectMapper();
                return Either.right(mapper.convertValue(result.get().get().getData(), typeClass));
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }
        });
    }

    @Async
    @Override
    public CompletableFuture<Either<String, T>> GetById(String id) {
        return CompletableFuture.supplyAsync(() -> {
            try{
                Query query = collection.whereEqualTo("Id", id);
                List<QueryDocumentSnapshot> documents = query.get().get().getDocuments();
                
                if(documents.size()==0) return Either.left("Data not dound for id: "+id);
                
                ObjectMapper mapper = new ObjectMapper();
                T data =  mapper.convertValue(documents.get(0).getData(), typeClass);
                return Either.right(data);
            
            }catch(Exception ex){
                return Either.left(ex.getMessage());
            }

            
        });
        

    }


}
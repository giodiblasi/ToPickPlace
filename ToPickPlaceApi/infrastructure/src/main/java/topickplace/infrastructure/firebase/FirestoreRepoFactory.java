package topickplace.infrastructure.firebase;

import java.util.Map;
import java.util.function.Function;

import javax.annotation.PostConstruct;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class FirestoreRepoFactory implements IFirestoreRepoFactory{
    private Function<String, CollectionReference> getCollectionReference;

    @Autowired private Firebase firebase;
    
    private FirestoreRepoFactory(DocumentReference documentRef){
        this.getCollectionReference = collectionPath->documentRef.collection(collectionPath);
    }

    public FirestoreRepoFactory(){}

    @PostConstruct
    public void Init(){
        var firestore = firebase.GetFirestore();
        this.getCollectionReference = collectionPath->firestore.collection(collectionPath);
    }

    public  FirestoreRepoFactory FromDocument(Class<?> classType, String documentId){
        var collection = CollectionMap.Get(classType);
        var doc = getCollectionReference.apply(collection).document(documentId);
        return new FirestoreRepoFactory(doc);
    }

    public <T> IRepository<T> GetRepo(Class<T> classType){
        var collection = CollectionMap.Get(classType);
        var repo = new FireStoreRepository(getCollectionReference.apply(collection));
        return new FirestoreRepoConverter<T>(classType, repo);
    }
}
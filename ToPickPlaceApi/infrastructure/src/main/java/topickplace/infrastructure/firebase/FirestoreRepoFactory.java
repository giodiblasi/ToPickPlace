package topickplace.infrastructure.firebase;

import javax.annotation.PostConstruct;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class FirestoreRepoFactory implements IFirestoreRepoFactory{
    private DocumentReference document;
    private Boolean isSubRepo;

    @Autowired
    private Firebase firebase;

    private Firestore firestore;
    
    private FirestoreRepoFactory(Firestore firestore, DocumentReference collectionRef, Boolean isSubRepo){
        this.document=collectionRef;
        this.isSubRepo = isSubRepo;
        this.firestore = firestore;
    }

    public FirestoreRepoFactory(){

    }

    @PostConstruct
    public void Init(){
        this.firestore = firebase.GetFirestore();
        this.isSubRepo = false;
    }


    public  FirestoreRepoFactory FromDocument(String collection, String documentId){
        var doc = isSubRepo
            ? document.collection(collection).document(documentId)
            : firestore.collection(collection).document(documentId);
    
        return new FirestoreRepoFactory(this.firestore, doc, true);
    }



    public <T> IRepository<T> GetRepo(Class<T> classType, String collection){
        var repo = isSubRepo
            ? new FireStoreRepository(document.collection(collection))
            : new FireStoreRepository(firestore.collection(collection));
        return new FirestoreRepoConverter<T>(classType, repo);
    }
}
package topickplace.infrastructure.firebase;

import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.api.core.ApiFutures;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import topickplace.core.models.Attendee;
import topickplace.core.models.Event;
import topickplace.core.models.Topic;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = FirestoreRepoIntegrationTests.FirestoreRepoFactoryTestConfiguration.class)
public class FirestoreRepoIntegrationTests {
    
    @Configuration
    static class FirestoreRepoFactoryTestConfiguration {
  
        @Bean
        public FirestoreRepoFactory firestoreRepoFactory() {
            var factory =  new FirestoreRepoFactory();
            return factory;
        }

        @Bean
        public Firebase firebase() {
            var firebase =  Mockito.mock(Firebase.class);
            Firestore mockFirestore = Mockito.mock(Firestore.class);
            when(firebase.GetFirestore()).thenReturn(mockFirestore);
            return firebase;
        }
    }

    @Autowired FirestoreRepoFactory firestoreRepoFactory;
    @Autowired Firebase firebase;

    @Test
    public void GetEvent() throws InterruptedException, ExecutionException{
        SetupEventDocument("id", WithExisitingEvent("eventId","event"));
        var res = firestoreRepoFactory.GetRepo(Event.class).GetById("id");
        var result = res.get();
        Assert.assertTrue(result.isRight());
        Assert.assertEquals("event", result.get().getName());
        Assert.assertEquals("eventId", result.get().getId());
    }

    @Test
    public void GetTopicOfSpecifiedEvent() throws InterruptedException, ExecutionException{
        SetupTopicDocument("eventId", "topicId", WithExisitingTopic("topicId", "topicDesc"));
        var topic = firestoreRepoFactory
            .FromDocument(Event.class, "eventId")
            .GetRepo(Topic.class).GetById("topicId")
            .get();
        
        Assert.assertTrue(topic.isRight());
        Assert.assertEquals("topicDesc", topic.get().getDescription());
        Assert.assertEquals("topicId", topic.get().getId());
    }

    @Test
    public void GetAttendeeOfSpecifiedEvent() throws InterruptedException, ExecutionException{
        SetupAttendeeDocument("eventId", "attendeeId", WithExisitingAttendee("attendeeId", "John"));
        var attendee = firestoreRepoFactory
            .FromDocument(Event.class, "eventId")
            .GetRepo(Attendee.class).GetById("attendeeId")
            .get();
        
        Assert.assertTrue(attendee.isRight());
        Assert.assertEquals("John", attendee.get().getName());
        Assert.assertEquals("attendeeId", attendee.get().getId());
    }

    @Test
    public void NotExisitingEvent() throws InterruptedException, ExecutionException{
        SetupEventDocument("id", WithNotExisitingEvent());
        var res = firestoreRepoFactory.GetRepo(Event.class).GetById("id");
        var result = res.get();
        Assert.assertTrue(result.isLeft());
        Assert.assertEquals("Data not found for id: id", result.getLeft());
    }

    private void SetupEventDocument(String id, DocumentSnapshot entry){
        var firestore = firebase.GetFirestore();
        DocumentReference document = Mockito.mock(DocumentReference.class);
        when(document.get()).thenReturn(ApiFutures.immediateFuture(entry));
        CollectionReference collection = Mockito.mock(CollectionReference.class);
        when(firestore.collection("Events")).thenReturn(collection);
        when(collection.document(id)).thenReturn(document);
    }

    private void SetupTopicDocument(String eventId, String topicId, DocumentSnapshot entry){
        var firestore = firebase.GetFirestore();
        DocumentReference eventDocumentRef = Mockito.mock(DocumentReference.class);
        DocumentReference topicDocumentRef = Mockito.mock(DocumentReference.class);
        CollectionReference eventCollection = Mockito.mock(CollectionReference.class);
        CollectionReference topicCollection = Mockito.mock(CollectionReference.class);
        
        when(firestore.collection("Events")).thenReturn(eventCollection);
        when(eventCollection.document(eventId)).thenReturn(eventDocumentRef);
        when(eventDocumentRef.collection("Topics")).thenReturn(topicCollection);
        when(topicCollection.document(topicId)).thenReturn(topicDocumentRef);
        when(topicDocumentRef.get()).thenReturn(ApiFutures.immediateFuture(entry));
    }

    private void SetupAttendeeDocument(String eventId, String attendeeId, DocumentSnapshot entry){
        var firestore = firebase.GetFirestore();
        DocumentReference eventDocumentRef = Mockito.mock(DocumentReference.class);
        DocumentReference attendeeDocRef = Mockito.mock(DocumentReference.class);
        CollectionReference eventCollection = Mockito.mock(CollectionReference.class);
        CollectionReference attendeeCollection = Mockito.mock(CollectionReference.class);
        
        when(firestore.collection("Events")).thenReturn(eventCollection);
        when(eventCollection.document(eventId)).thenReturn(eventDocumentRef);
        when(eventDocumentRef.collection("Attendees")).thenReturn(attendeeCollection);
        when(attendeeCollection.document(attendeeId)).thenReturn(attendeeDocRef);
        when(attendeeDocRef.get()).thenReturn(ApiFutures.immediateFuture(entry));
    }

    private DocumentSnapshot WithExisitingEvent(String id, String name) {
        DocumentSnapshot entry = Mockito.mock(DocumentSnapshot.class);
        when(entry.getData()).thenReturn(new HashMap<String, Object>(Map.of("name", name)));
        when(entry.getId()).thenReturn(id);
        when(entry.exists()).thenReturn(true);
        return entry;
    }

    private DocumentSnapshot WithExisitingTopic(String id, String description) {
        DocumentSnapshot entry = Mockito.mock(DocumentSnapshot.class);
        when(entry.getData()).thenReturn(new HashMap<String, Object>(Map.of("description", description)));
        when(entry.getId()).thenReturn(id);
        when(entry.exists()).thenReturn(true);
        return entry;
    }

    private DocumentSnapshot WithExisitingAttendee(String id, String name) {
        DocumentSnapshot entry = Mockito.mock(DocumentSnapshot.class);
        when(entry.getData()).thenReturn(new HashMap<String, Object>(Map.of("name", name)));
        when(entry.getId()).thenReturn(id);
        when(entry.exists()).thenReturn(true);
        return entry;
    }

    private DocumentSnapshot WithNotExisitingEvent() {
        DocumentSnapshot entry = Mockito.mock(DocumentSnapshot.class);
        when(entry.exists()).thenReturn(false);
        return entry;
    }
}
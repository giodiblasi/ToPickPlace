package topickplace.webapi;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import topickplace.core.models.Event;
import topickplace.infrastructure.firebase.Firebase;
import topickplace.infrastructure.firebase.FirestoreRepoConverter;
import topickplace.infrastructure.repositories.IRepository;

@Configuration
public class ContainerConfiguration {
    
    private Firebase firebase;
    
    public ContainerConfiguration() throws IOException {
        String firestoreCredentials = System.getenv("FIRESTORE_KEY_PATH");
        firebase = new Firebase(firestoreCredentials);
    }

    @Bean
    public IRepository<Event> firestoreEventRepo() throws IOException {
        return new FirestoreRepoConverter<Event>(
            Event.class,
            firebase,
            "Events");
    }
 
   
}
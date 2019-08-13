package topickplace.webapi;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import topickplace.core.models.Event;
import topickplace.core.repositories.IRepository;
import topickplace.infrastructure.repositories.FireStoreRepository;

@Configuration
public class ContainerConfiguration {

    @Bean
    public IRepository<Event> firestoreEventRepo() throws IOException {
        return new FireStoreRepository<>(
            "http://localhost:8080/",
            System.getenv("FIRESTORE_KEY_PATH"),
            "Events",
            Event.class);
    }
 
   
}
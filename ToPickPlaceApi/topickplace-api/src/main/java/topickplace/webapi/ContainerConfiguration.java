package topickplace.webapi;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import topickplace.infrastructure.models.EventDAO;
import topickplace.infrastructure.repositories.FireStoreRepository;
import topickplace.infrastructure.repositories.IRepository;

@Configuration
public class ContainerConfiguration {

    @Bean
    public IRepository<EventDAO> firestoreEventRepo() throws IOException {
        return new FireStoreRepository<>(
            System.getenv("FIRESTORE_KEY_PATH"),
            "Events",
            EventDAO.class);
    }
 
   
}
package topickplace.webapi;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import topickplace.infrastructure.firebase.Firebase;

@Configuration
public class ContainerConfiguration {
    
    @Bean
    public Firebase firebase() throws IOException {
        String firestoreCredentials = System.getenv("FIRESTORE_KEY_PATH");
        return new Firebase(firestoreCredentials);
    }   
}
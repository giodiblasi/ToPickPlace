package topickplace.webapi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import topickplace.core.repositories.IEventRepository;
import topickplace.infrastructure.repositories.EventRepository;

@Configuration
public class ContainerConfiguration {
 
    @Bean
    public IEventRepository eventRepository() {
        return new EventRepository();
    }
 
   
}
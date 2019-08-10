package seatassigner.seatassignerapi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import seatassigner.core.repositories.IEventRepository;
import seatassigner.infrastructure.repositories.EventRepository;

@Configuration
public class ContainerConfiguration {
 
    @Bean
    public IEventRepository eventRepository() {
        return new EventRepository();
    }
 
   
}
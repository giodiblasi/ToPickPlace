package topickplace.infrastructure.repositories;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.vavr.control.Either;
import topickplace.core.models.Event;
import topickplace.core.repositories.IEventRepository;
import topickplace.infrastructure.models.EventDAO;
@Service
public class EventRepository implements IEventRepository{

    @Autowired
    private final IRepository<EventDAO> repository;

    public EventRepository(IRepository<EventDAO> repository){
        this.repository = repository;
    }

    public CompletableFuture<Either<String,Event>> CreateEvent(Event event) {
        return repository
            .Save(ToDAO(event))
            .thenApply(result->result.map(storedDao->FromDAO(storedDao)));    
    }

    public CompletableFuture<Either<String,Event>> GetEvent(String id) {
        return repository
        .GetById(id)
        .thenApply(result->result.map(eventDAO->FromDAO(eventDAO)));
    }
    
    private EventDAO ToDAO(Event event){
        EventDAO dao = new EventDAO();
        dao.setName(event.getName());
        return dao;
    }

    private Event FromDAO(IdEntry<EventDAO> dao) {
        Event event = new Event();
        event.setId(dao.getId());
        event.setName(dao.getData().getName());
        return event;
    }

}
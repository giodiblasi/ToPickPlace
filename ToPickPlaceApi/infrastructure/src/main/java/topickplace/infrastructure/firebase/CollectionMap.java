package topickplace.infrastructure.firebase;

import java.util.Map;

import topickplace.core.models.Attendee;
import topickplace.core.models.Event;
import topickplace.core.models.Topic;

public class CollectionMap {
    private static final Map<Class<?>, String> collectionMap = Map.of(
        Event.class, "Events",
        Topic.class, "Topics",
        Attendee.class, "Attendees"
    );

    public static <T> String Get(Class<T> className){
        return collectionMap.get(className);
    }
}
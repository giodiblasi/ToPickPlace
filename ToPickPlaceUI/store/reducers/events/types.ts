import { EventSummary, Event } from "../../types/events";

export interface EventsState {
    availableEvents: Array<EventSummary>,
    selectedEvent: Event
}



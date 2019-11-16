import { SelectableList } from "../../utils/typeUtils";

export interface EventSummary{
    id: string,
    description: string
}

export interface Event{
    id: string,
    description:string,
}

export interface Attendee{
    name: string
}

export interface Topic{
    id: string,
    description: string,
    weight: number
}

export interface EventsState {
    availableEvents: Array<EventSummary>,
    selectedEvent: Event
}

export type TopicsState = SelectableList<Topic>;
export type AttendeesState  = SelectableList<Attendee>;

export type AppState = {
    events: EventsState,
    attendees: AttendeesState,
    topics: TopicsState
}
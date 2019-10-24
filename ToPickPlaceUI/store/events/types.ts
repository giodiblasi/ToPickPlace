export interface EventSummary{
    id: string,
    description: string
}

export interface Event{
    id: string,
    description:string
}

export interface EventsState {
    availableEvents: Array<EventSummary>,
    selectedEvent: Event
}

export const LOAD_AVAILABLE_EVENTS = 'LOAD_AVAILABLE_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const DELTE_EVENT = 'DELETE_EVENT';
export const SELECT_EVENT = 'SELECT_EVENT';


interface loadAvailableEvents{
    type: typeof LOAD_AVAILABLE_EVENTS,
    payload: Array<EventSummary>
};

interface selectEvent{
    type: typeof SELECT_EVENT,
    payload: Event
};

export type EventsActionTypes =  loadAvailableEvents | selectEvent;
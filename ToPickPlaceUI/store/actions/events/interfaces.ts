import { EventSummary, Event, Attendee } from "../../types/events";

export const LOAD_AVAILABLE_EVENTS = 'LOAD_AVAILABLE_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const DELTE_EVENT = 'DELETE_EVENT';
export const SELECT_EVENT = 'SELECT_EVENT';
export const LOAD_ATTENDEES = 'LOAD_ATTENDEES';
export interface loadAvailableEvents{
    type: typeof LOAD_AVAILABLE_EVENTS,
    payload: Array<EventSummary>
};

export interface selectEvent{
    type: typeof SELECT_EVENT,
    payload: Event
};

export interface loadAttendees{
    type: typeof LOAD_ATTENDEES,
    payload: Array<Attendee>
}

export type EventsActionTypes =  loadAvailableEvents | selectEvent | loadAttendees;
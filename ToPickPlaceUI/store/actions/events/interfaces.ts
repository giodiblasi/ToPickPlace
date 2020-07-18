import { EventSummaryApiModel, EventApiModel } from "../../../api/topickplaceapi/models";

export const LOAD_AVAILABLE_EVENTS = 'LOAD_AVAILABLE_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
export const DELTE_EVENT = 'DELETE_EVENT';
export const SELECT_EVENT = 'SELECT_EVENT';
export const NEW_EVENT = 'NEW_EVENT';

export interface loadAvailableEvents{
    type: typeof LOAD_AVAILABLE_EVENTS,
    payload: Array<EventSummaryApiModel>
};

export interface selectEvent{
    type: typeof SELECT_EVENT,
    payload: EventApiModel
};

export interface newEvent{
    type: typeof NEW_EVENT,
    payload: EventApiModel
};

export type EventsActionTypes =  loadAvailableEvents | selectEvent | newEvent;
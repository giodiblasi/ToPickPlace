import { SelectableList } from "../../utils/typeUtils";

export interface EventSummary{
    id: string,
    description: string,
    name:string

}

export interface EventMap{
    width: number,
    heigth:number,
    availableSeats: Array<0|1>
}

export interface Event{
    id: string,
    description:string,
    name: string,
    eventMap?: EventMap
}

export interface Attendee{
    id:string
    name: string
    surname: string,
    bio?:string,
    topics?:Array<string>
}

export interface Topic{
    id: string,
    description: string,
    weigth: number,
    name: string
}

export interface EventsState {
    availableEvents: Array<EventSummary>,
    selectedEvent: Event
}

export interface Solution {
    seats: Array<string>
}


export type TopicsState = SelectableList<Topic, string>;
export type AttendeesState  = SelectableList<Attendee, string>;
export type SolutionState = Solution

export enum MODALS{
    NEW_ATTENDEE,
    NEW_TOPIC,
    UPDATE_ATTENDEE
}

export type ModalState = {
    opened: boolean,
    type?: MODALS
}

export type AppState = {
    events: EventsState,
    attendees: AttendeesState,
    topics: TopicsState,
    modal: ModalState,
    solution: SolutionState
}

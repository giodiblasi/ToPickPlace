import { Attendee } from "../../types/events";

export interface AttendeesState {
    availables: Array<Attendee>,
    selected?: Attendee
}



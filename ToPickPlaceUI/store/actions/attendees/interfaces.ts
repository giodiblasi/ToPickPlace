import { Attendee } from "../../types";

export const SELECT_ATTENDEE = 'SELECT_ATTENDEE';

export type selectAttendeeAction = {
    type: typeof SELECT_ATTENDEE,
    payload: string
};

export type AttendeesActionTypes =  selectAttendeeAction;
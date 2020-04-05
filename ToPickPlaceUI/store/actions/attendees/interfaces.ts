import { Attendee } from "../../types";

export const SELECT_ATTENDEE = 'SELECT_ATTENDEE';
export const OPEN_NEW_ATTENDEE_FORM = 'OPEN_NEW_ATTENDEE_FORM';
export const SAVED_ATTENDEE = 'SAVED_ATTENDEE';

export type selectAttendeeAction = {
    type: typeof SELECT_ATTENDEE,
    payload: string
};

export type openNewAttendeeFormAction  = {
    type: typeof OPEN_NEW_ATTENDEE_FORM,
}

export type savedAttendeeAction = {
    type: typeof SAVED_ATTENDEE,
    payload: Attendee
}

export type AttendeesActionTypes =  selectAttendeeAction | openNewAttendeeFormAction | savedAttendeeAction; 
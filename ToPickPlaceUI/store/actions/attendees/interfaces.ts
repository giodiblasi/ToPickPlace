export const SELECT_ATTENDEE = 'SELECT_ATTENDEE';
export const OPEN_NEW_ATTENDEE_FORM = 'OPEN_NEW_ATTENDEE_FORM';

export type selectAttendeeAction = {
    type: typeof SELECT_ATTENDEE,
    payload: string
};

export type openNewAttendeeFormAction  = {
    type: typeof OPEN_NEW_ATTENDEE_FORM,
}

export type AttendeesActionTypes =  selectAttendeeAction | openNewAttendeeFormAction; 
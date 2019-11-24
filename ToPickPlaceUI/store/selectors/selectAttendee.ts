import {Attendee, AppState} from '../types';

export const getAttendeeByid = (state:AppState): Attendee|undefined => 
    state.attendees.selected ?
        state.attendees.availables.find(attendee=>attendee.id === state.attendees.selected)
        : undefined;

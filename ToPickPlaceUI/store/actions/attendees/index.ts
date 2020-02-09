import { AttendeesActionTypes, SELECT_ATTENDEE, OPEN_NEW_ATTENDEE_FORM } from './interfaces';
import { Dispatch } from 'react';
import { AppState } from '../../types';

export const selectAttendee = (id: string) => async (dispatch: Dispatch<AttendeesActionTypes>, getState: () => AppState) => {
  return dispatch({
    type: SELECT_ATTENDEE,
    payload: id
  });
}

export const openNewAttendeeForm = () => ({
  type: OPEN_NEW_ATTENDEE_FORM,
});
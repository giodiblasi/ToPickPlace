import { AttendeesActionTypes, SELECT_ATTENDEE} from './interfaces';
import { Dispatch } from 'react';
import { AppState } from '../../types';

export const selectAttendee = (id:string) => async (dispatch: Dispatch<AttendeesActionTypes>, getState: ()=>AppState) => {
  return dispatch({
    type:SELECT_ATTENDEE,
    payload: id
  });
}
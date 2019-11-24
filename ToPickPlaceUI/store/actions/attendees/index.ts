import { AttendeesActionTypes, SELECT_ATTENDEE} from './interfaces';
import { Dispatch } from 'react';
import { AppState, Attendee } from '../../types';
import { Store } from 'redux';
import { AppStore } from '../../../utils/nextTypes';

const defaultAttendee: Attendee = {
  name: '',
  id: '0',
  surname: ''
}
export const selectAttendee = (id:string) => async (dispatch: Dispatch<AttendeesActionTypes>, getState: ()=>AppState) => {
  return dispatch({
    type:SELECT_ATTENDEE,
    payload: id
  });
}
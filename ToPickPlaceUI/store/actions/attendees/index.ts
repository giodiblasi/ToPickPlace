import { AttendeesActionTypes, SELECT_ATTENDEE, OPEN_NEW_ATTENDEE_FORM, SAVED_ATTENDEE } from './interfaces';
import { Dispatch } from 'react';
import { Attendee } from '../../types';
import { saveAttendee as saveAttendeeApi } from '../../../api/topickplaceapi';

export const selectAttendee = (id: string) => async (dispatch: Dispatch<AttendeesActionTypes>) => {
  return dispatch({
    type: SELECT_ATTENDEE,
    payload: id
  });
}

export const openNewAttendeeForm = () => ({
  type: OPEN_NEW_ATTENDEE_FORM,
});

export const saveAttendee = (eventId:string, attendee:Omit<Attendee,'id'>) => async (dispatch: Dispatch<AttendeesActionTypes>) => {
  const savedAttendee = await saveAttendeeApi(eventId, {
    name: attendee.name,
    surname: attendee.surname,
    topics: attendee.topics ?? []
  });
  
  return dispatch({
    type: SAVED_ATTENDEE,
    payload: {
      ...savedAttendee,
      id: savedAttendee.id ?? ''
    }
  })
}
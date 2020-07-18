import { AttendeesActionTypes, SELECT_ATTENDEE, OPEN_NEW_ATTENDEE_FORM, SAVED_ATTENDEE, OPEN_UPDATE_ATTENDEE_FORM, DELETED_ATTENDEE } from './interfaces';
import { Dispatch } from 'react';
import { Attendee } from '../../types';
import { saveAttendee as saveAttendeeApi,
        updateAttendee as updateAttendeeApi,
        deleteAttendee as deleteAttendeeApi } from '../../../api/topickplaceapi';

export const selectAttendee = (id: string) => async (dispatch: Dispatch<AttendeesActionTypes>) => {
  return dispatch({
    type: SELECT_ATTENDEE,
    payload: id
  });
}

export const openNewAttendeeForm = () => ({
  type: OPEN_NEW_ATTENDEE_FORM,
});

export const openUpdateAttendeeForm = () => ({
  type: OPEN_UPDATE_ATTENDEE_FORM
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

export const updateAttendee = (eventId:string, attendee:Attendee) => async (dispatch: Dispatch<AttendeesActionTypes>) => {
  await updateAttendeeApi(eventId, {
    id: attendee.id,
    name: attendee.name,
    surname: attendee.surname,
    topics: attendee.topics ?? []
  });
  
  return dispatch({
    type: SAVED_ATTENDEE,
    payload: {
      ...attendee
    }
  })
}

export const deleteAttendee = (eventId:string, attendeeId:string) => async (dispatch: Dispatch<AttendeesActionTypes>) => {
  await deleteAttendeeApi(eventId, attendeeId);
  
  return dispatch({
    type: DELETED_ATTENDEE,
    payload: attendeeId 
  });
}
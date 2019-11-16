import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes} from './interfaces';
import { fetchEvent, fetchSummaries } from '../../../api/topickplaceapi';
import { Dispatch } from 'react';

export const loadEvents = () => async (dispatch: Dispatch<EventsActionTypes>) => {
  const events =  await fetchSummaries();
  return dispatch({
    type: LOAD_AVAILABLE_EVENTS,
    payload: events.map(e => ({id: e.id, description: e.description}))
  });
}

export const selectEvent = (eventId: string) => async (dispatch: Dispatch<EventsActionTypes>)  =>{
  const event = await fetchEvent(eventId) || {id: '', description: '', attendees:[], topics:[]};
  return dispatch({
      type: SELECT_EVENT,
      payload: event
    });
}
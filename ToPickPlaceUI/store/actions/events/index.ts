import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes, LOAD_ATTENDEES} from './interfaces';
import { fetchEvent, fetchSummaries } from '../../../api/topickplaceapi/event';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { AppState } from '../..';

export const loadEvents: ThunkAction<void, AppState, null, EventsActionTypes> = () => async (dispatch: Dispatch<EventsActionTypes>) => {
  const events =  await fetchSummaries();
  dispatch({
    type: LOAD_AVAILABLE_EVENTS,
    payload: events.map(e => ({id: e.id, description: e.description}))
  });
}

export const selectEvent = (eventId: string): ThunkAction<void, AppState, null, EventsActionTypes> => async (dispatch: Dispatch<EventsActionTypes>)  =>{
  const event = await fetchEvent(eventId) || {id: '', description: '', attendees:[]};
  return Promise.all([
    dispatch({
      type: SELECT_EVENT,
      payload: event
    }),
    dispatch({
      type: LOAD_ATTENDEES,
      payload: event.attendees
    })]);
}
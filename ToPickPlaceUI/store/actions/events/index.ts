import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes, NEW_EVENT} from './interfaces';
import { fetchEvent, fetchSummaries, createEvent as createEventApi } from '../../../api/topickplaceapi';
import { Dispatch } from 'react';


export const loadEvents = () => async (dispatch: Dispatch<EventsActionTypes>) => {
  const events =  await fetchSummaries();
  return dispatch({
    type: LOAD_AVAILABLE_EVENTS,
    payload: events.map(e => ({id: e.id, description: e.description, name: e.name}))
  });
}

export const selectEvent = (eventId: string) => async (dispatch: Dispatch<EventsActionTypes>)  =>{
  const event = await fetchEvent(eventId) || {id: '', description: '', name: '', attendees:[], topics:[]};
  return dispatch({
      type: SELECT_EVENT,
      payload: event
    });
}

export const createEvent = (eventName: string) => async (dispatch: Dispatch<EventsActionTypes>)  =>{
  const event = await createEventApi({
    attendees:[],
    topics:[],
    description:'',
    name: eventName,
    eventMap:{
      heigth:3,
      width:3,
      availableSeats:[0,0,0,0,0,0,0,0,0]
    }
  });
  return dispatch({
      type: NEW_EVENT,
      payload: event
    });
}
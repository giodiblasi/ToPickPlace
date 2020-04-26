import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes} from './interfaces';
import { fetchEvent, fetchSummaries } from '../../../api/topickplaceapi';
import { Dispatch } from 'react';
import { EventMapApiModel } from '../../../api/topickplaceapi/models';

const fakeEventMap: EventMapApiModel ={
  width: 3,
  heigth: 5,
  availableSeats: [
    0,1,1,1,0,0,1,0,1,0,0,0,0,1,0
  ]
}
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
      payload: {...event, eventMap: fakeEventMap}
    });
}
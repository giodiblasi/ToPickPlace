import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes} from './interfaces';
import { fetchEvent, fetchSummaries } from '../../../api/topickplaceapi/event';

export function loadEvents(): EventsActionTypes {
  return {
    type: LOAD_AVAILABLE_EVENTS,
    payload: fetchSummaries().map(e => ({id: e.id, description: e.description}))
  }
}

export function selectEvent(eventId: string): EventsActionTypes {
  return {
    type: SELECT_EVENT,
    payload: fetchEvent(eventId) || {id:'', attendees:[], description:'' }
  }
}
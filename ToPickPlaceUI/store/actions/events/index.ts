import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes} from './interfaces';
import { EventSummary, Event } from '../../types/events';

const mockedEvents: Array<Event> = [{
  id:"1",
  description: "My Conference",
  attendees: [
    {name: 'Will'},
    {name: 'Maggie'}
  ]
  
},
{
  id:"2",
  description: "My Birthday",
  attendees: [
    {name: 'Susie'},
    {name: 'Peter'}
  ]
}]

const getEventById = (id:string):Event => {
  var eventSummary = mockedEvents.find(e=>e.id===id) || {id:'', description:'', attendees:[]};
  return eventSummary;
}

export function loadEvents(): EventsActionTypes {
  return {
    type: LOAD_AVAILABLE_EVENTS,
    payload: mockedEvents.map((e:Event): EventSummary=>({id: e.id, description: e.description}))
  }
}

export function selectEvent(eventId: string): EventsActionTypes {
  return {
    type: SELECT_EVENT,
    payload: getEventById(eventId)
  }
}
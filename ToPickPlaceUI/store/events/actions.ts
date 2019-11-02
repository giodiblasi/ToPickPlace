import { LOAD_AVAILABLE_EVENTS, SELECT_EVENT, EventsActionTypes, Event } from './types'

const mockedEvents = [{
  id:"1",
  description: "My Conference" 
},
{
  id:"2",
  description: "My Birthday" 
}]

const getEventById = (id:string):Event => {
  var eventSummary = mockedEvents.find(e=>e.id===id) || {id:'', description:''};
  return {
    id: eventSummary.id,
    description: eventSummary.description
    
  }
}

export function loadEvents(): EventsActionTypes {
  return {
    type: LOAD_AVAILABLE_EVENTS,
    payload: mockedEvents
  }
}

export function selectEvent(eventId: string): EventsActionTypes {
  return {
    type: SELECT_EVENT,
    payload: getEventById(eventId)
  }
}
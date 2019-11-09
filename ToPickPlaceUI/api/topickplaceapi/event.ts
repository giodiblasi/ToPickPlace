import { EventSummaryApiModel, EventApiModel } from "./models"

const mockedEvents: Array<EventApiModel> = [{
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

export const fetchSummaries = (): Array<EventSummaryApiModel> => {
    return mockedEvents.map(({id, description})=>({id, description}))
}

export const fetchEvent = (id: string): EventApiModel|undefined =>  mockedEvents.find(e=>e.id===id);

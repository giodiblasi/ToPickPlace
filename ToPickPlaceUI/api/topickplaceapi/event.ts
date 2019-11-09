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

export const fetchSummaries = (): Promise<Array<EventSummaryApiModel>> => {
    return Promise.resolve(mockedEvents.map(({id, description})=>({id, description})));
}

export const fetchEvent = (id: string): Promise<EventApiModel | undefined> => Promise.resolve(mockedEvents.find(e=>e.id===id));

import { EventSummaryApiModel, EventApiModel, TopicApiModel } from "./models"

const mockedEvents: Array<EventApiModel> = [{
    id:"1",
    description: "My Conference",
    attendees: [
      {id: '1',name: 'Will', topics:['1','2'], surname: 'Doe', bio: 'He was born in USA'},
      {id: '2',name: 'Maggie', topics:['2','3'], surname: 'Doe', bio: 'He was born in USA'}
    ],
    topics:[{
      id: '1',
      description:'Cars',
      weight:1
    },
    {
      id: '2',
      description:'Software',
      weight:2,
    },
    {
      id: '3',
      description:'Houses',
      weight:3
    }] 
  },
  {
    id:"2",
    description: "My Birthday",
    attendees: [
      {id: '1',name: 'Susie', topics:['1','2'], surname: 'Doe', bio: 'He was born in USA'},
      {id: '2',name: 'Peter', topics:['2','3'], surname: 'Doe', bio: 'He was born in USA'}
    ],
    topics:[{
      id: '1',
      description:'Peterson',
      weight:1
    },
    {
      id: '2',
      description:'Rossi',
      weight:2,
    },
    {
      id: '3',
      description:'Verdi',
      weight:3
    }]
  }]

export const fetchSummaries = (): Promise<Array<EventSummaryApiModel>> =>
    Promise.resolve(mockedEvents.map(({id, description})=>({id, description})));

export const fetchEvent = (id: string): Promise<EventApiModel | undefined> =>
  Promise.resolve(mockedEvents.find(e=>e.id===id));
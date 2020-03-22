import { EventSummaryApiModel, EventApiModel, TopicApiModel } from "./models"
import { getApiUrl } from '../../utils/costants';
import fetch from 'isomorphic-unfetch'
 
const mockedEvents: Array<EventApiModel> = [{
  id: "0mfZrcdFNmewK6one94d",
  description: "My Conference",
  name: 'event1',
  attendees: [
    { id: '1', name: 'Will', topics: ['1', '2'], surname: 'Doe', bio: 'He was born in USA' },
    { id: '2', name: 'Maggie', topics: ['2', '3'], surname: 'Doe', bio: 'He was born in USA' }
  ],
  topics: [{
    id: '1',
    description: 'Cars',
    weight: 1
  },
  {
    id: '2',
    description: 'Software',
    weight: 2,
  },
  {
    id: '3',
    description: 'Houses',
    weight: 3
  }]
},
{
  id: "EKqg38RyGxXq9ionum9Y",
  description: "My Birthday",
  name: 'event2',
  attendees: [
    { id: '1', name: 'Susie', topics: ['1', '2'], surname: 'Doe', bio: 'He was born in USA' },
    { id: '2', name: 'Peter', topics: ['2', '3'], surname: 'Doe', bio: 'He was born in USA' }
  ],
  topics: [{
    id: '1',
    description: 'Peterson',
    weight: 1
  },
  {
    id: '2',
    description: 'Rossi',
    weight: 2,
  },
  {
    id: '3',
    description: 'Verdi',
    weight: 3
  }]
}]


export const fetchSummaries = async (): Promise<Array<EventSummaryApiModel>> => {
  const res = await fetch(`${getApiUrl()}/event/summary`).then(response => response.json());
  console.log(res);
  return res;//Promise.resolve(mockedEvents.map(({id, description, name})=>({id, description, name})));
}


export const fetchEvent = async (id: string): Promise<EventApiModel | undefined> => {
  return await fetch(`${getApiUrl()}/event/${id}`, {
    headers: new Headers(
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    ), method: 'GET', mode: 'no-cors'
  })

    .then(response => { var r = response.json(); console.log(r); return r; })
    .catch(err => console.log(err));
}
  //Promise.resolve(mockedEvents.find(e=>e.id===id));

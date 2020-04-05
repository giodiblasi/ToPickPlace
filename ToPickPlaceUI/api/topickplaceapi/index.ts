import { EventSummaryApiModel, EventApiModel, TopicApiModel, AttendeeApiModel } from "./models"
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
  return res;
}


export const fetchEvent = async (id: string): Promise<EventApiModel | undefined> => {
  return await fetch(`${getApiUrl()}/event/${id}`)
    .then(response => { var r = response.json(); console.log(r); return r; })
    .catch(err => console.log(err));
}

export const saveAttendee = async (eventId: string, attendee: AttendeeApiModel): Promise<AttendeeApiModel> =>{
    var res =  await fetch(`${getApiUrl()}/event/${eventId}/attendee`,{
      method: 'POST',
      body: JSON.stringify(attendee),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(r=>r.json())
    .catch(err => console.log(err));
    return res;
}

export const saveTopic = async (eventId: string, topic: TopicApiModel): Promise<TopicApiModel> =>{
  var res =  await fetch(`${getApiUrl()}/event/${eventId}/topic`,{
    method: 'POST',
    body: JSON.stringify(topic),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(r=>r.json())
  .catch(err => console.log(err));
  return res;
}
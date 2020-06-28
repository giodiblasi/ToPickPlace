import { EventSummaryApiModel, EventApiModel, TopicApiModel, AttendeeApiModel, EventMapApiModel, SolutionRequest, Solution } from "./models"
import { getApiUrl, getPlannerUrl } from '../../utils/costants';
import fetch from 'isomorphic-unfetch'

export const fetchSummaries = async (): Promise<Array<EventSummaryApiModel>> => {
  const res = await fetch(`${getApiUrl()}/event/summary`).then(response => response.json());
  return res;
}


export const fetchEvent = async (id: string): Promise<EventApiModel | undefined> => {
  return await fetch(`${getApiUrl()}/event/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const saveAttendee = async (eventId: string, attendee: AttendeeApiModel): Promise<AttendeeApiModel> => {
  var res = await fetch(`${getApiUrl()}/event/${eventId}/attendee`, {
    method: 'POST',
    body: JSON.stringify(attendee),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(r => r.json())
    .catch(err => console.log(err));
  return res;
}

export const saveTopic = async (eventId: string, topic: TopicApiModel): Promise<TopicApiModel> => {
  var res = await fetch(`${getApiUrl()}/event/${eventId}/topic`, {
    method: 'POST',
    body: JSON.stringify(topic),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(r => r.json())
    .catch(err => console.log(err));
  return res;
}

export const updateEventMap = async (eventId: string, map: EventMapApiModel): Promise<string> => {
  return await fetch(`${getApiUrl()}/event/${eventId}/map`, {
    method: 'PUT',
    body: JSON.stringify(map),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(r => r.text())
}

export const getSolution = async (request: SolutionRequest): Promise<Solution> => {
  return await fetch(`${getPlannerUrl()}/seats`, {
    method: 'PUT',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json());
}

export const updateTopic = async (eventId: string, topic: TopicApiModel): Promise<string> => {
  return await fetch(`${getApiUrl()}/event/${eventId}/topic`,{
    method:'PUT',
    body: JSON.stringify(topic),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.text())
}

export const updateAttendee = async (eventId: string, attendee: AttendeeApiModel): Promise<string> => {
  return await fetch(`${getApiUrl()}/event/${eventId}/attendee`,{
    method:'PUT',
    body: JSON.stringify(attendee),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.text())
}
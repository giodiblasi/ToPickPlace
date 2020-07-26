import { TopicsActionTypes, SELECT_TOPIC, OPEN_NEW_TOPIC_FORM, SAVED_TOPIC, OPEN_UPDATE_TOPIC_FORM, DELETED_TOPIC } from './interfaces';
import { Dispatch } from 'react';
import { saveTopic as saveTopicApi,
        updateTopic as updateTopicApi,
        deleteTopic as deleteTopicApi,
        fetchAttendee as fetchAttendeeApi } from '../../../api/topickplaceapi'
import { Topic } from '../../types';

export const selectTopic = (id: string) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  return dispatch({
    type: SELECT_TOPIC,
    payload: id
  });
}

export const openNewTopicForm = () => ({
  type: OPEN_NEW_TOPIC_FORM
})

export const openUpdateTopicForm = () => ({
  type: OPEN_UPDATE_TOPIC_FORM
})

export const saveTopic = (eventId: string, topic: Omit<Topic, 'id'>) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  const savedTopic = await saveTopicApi(eventId, {
    description: topic.description,
    weigth: topic.weigth,
    name: topic.name
  });

  return dispatch({
    type: SAVED_TOPIC,
    payload: {
      ...savedTopic,
      id: savedTopic.id ?? ''
    }
  });
};

export const updateTopic = (eventId: string, topic: Topic) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  await updateTopicApi(eventId, {
    description: topic.description,
    name: topic.name,
    id: topic.id,
    weigth: topic.weigth
  });

  return dispatch({
    type: SAVED_TOPIC,
    payload: { ...topic }
  });
};

export const deleteTopic = (eventId: string, topicId: string) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  await deleteTopicApi(eventId, topicId);
  const updatedAttendees = await fetchAttendeeApi(eventId) || [];
  return dispatch({
    type: DELETED_TOPIC,
    payload: {
      topicId,
      updatedAttendees: updatedAttendees.map(attendee=>({
        id: attendee.id || '',
        name: attendee.name,
        surname: attendee.surname,
        topics: attendee.topics,
        bio: attendee.bio || ''
      }))
    }
  });
};
import { TopicsActionTypes, SELECT_TOPIC, OPEN_NEW_TOPIC_FORM, SAVED_TOPIC} from './interfaces';
import { Dispatch } from 'react';
import { saveTopic as saveTopicApi} from '../../../api/topickplaceapi'
import { Topic } from '../../types';

export const selectTopic = (id:string) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  return dispatch({
    type:SELECT_TOPIC,
    payload: id
  });
}

export const openNewTopicForm = () => ({
  type: OPEN_NEW_TOPIC_FORM
})

export const saveTopic = (eventId:string, topic:Omit<Topic,'id'>) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  const savedTopic = await saveTopicApi(eventId, {
    description: topic.description,
    weight: topic.weight
  });
  
  return dispatch({
    type: SAVED_TOPIC,
    payload: {
      ...savedTopic,
      id: savedTopic.id ?? ''
    }
  });
};  
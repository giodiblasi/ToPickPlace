import { TopicsActionTypes, SELECT_TOPIC, OPEN_NEW_TOPIC_FORM} from './interfaces';
import { Dispatch } from 'react';
import { AppState } from '../../types';

export const selectTopic = (id:string) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  return dispatch({
    type:SELECT_TOPIC,
    payload: id
  });
}

export const openNewTopicForm = () => ({
  type: OPEN_NEW_TOPIC_FORM
})
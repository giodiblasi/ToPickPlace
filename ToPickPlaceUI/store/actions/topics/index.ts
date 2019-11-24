import { TopicsActionTypes, SELECT_TOPIC} from './interfaces';
import { Dispatch } from 'react';
import { AppState } from '../../types';

export const selectTopic = (id:string) => async (dispatch: Dispatch<TopicsActionTypes>) => {
  return dispatch({
    type:SELECT_TOPIC,
    payload: id
  });
}
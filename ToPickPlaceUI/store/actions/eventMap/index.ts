import { EventMapActionTypes, UPDATED_MAP } from './interfaces';
import { Dispatch } from 'react';
import { EventMap } from '../../types';
import { updateEventMap as updateMap } from '../../../api/topickplaceapi';

export const updateEventMap = (eventId: string, map: EventMap) => async (dispatch: Dispatch<EventMapActionTypes>) => {
  await updateMap(eventId, map);
  return dispatch({
    type: UPDATED_MAP,
    payload: map
  });
}
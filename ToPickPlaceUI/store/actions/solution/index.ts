import { SolutionActionTypes, GET_SOLUTION } from './interfaces';
import { getSolution as fetchSolution } from '../../../api/topickplaceapi';
import { Dispatch } from 'react';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../types';

export const getSolution = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch: Dispatch<SolutionActionTypes>, getState) => {
  const state = getState();
  if (state.events.selectedEvent.eventMap) {
    const solution = await fetchSolution({
      map: {
        rows: state.events.selectedEvent.eventMap?.heigth,
        cols: state.events.selectedEvent.eventMap?.width,
        map: state.events.selectedEvent.eventMap.availableSeats
      },
      attendees: state.attendees.availables.map(a=>({
        id: a.id,
        topicIds: (a.topics ?? [])
      })),
      topics: state.topics.availables.map(t=>({
        id:t.id,
        weigth: t.weigth
      }))
    });

    return dispatch({
      type: GET_SOLUTION,
      payload: solution
    });
  }
}
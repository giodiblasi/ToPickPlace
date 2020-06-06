import { combineReducers } from 'redux';
import { EventsReducer } from './reducers/events'
import { AttendeesReducer } from './reducers/attendees';
import { TopicsReducer } from './reducers/topics';
import { ModalReducer } from './reducers/modal';
import { SolutionReducer } from './reducers/solution';

export const rootReducer = combineReducers({
  events: EventsReducer,
  attendees: AttendeesReducer,
  topics: TopicsReducer,
  modal: ModalReducer,
  solution: SolutionReducer
});
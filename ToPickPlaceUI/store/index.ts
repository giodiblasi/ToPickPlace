import { combineReducers } from 'redux';
import { EventsReducer } from './reducers/events'
import { AttendeesReducer } from './reducers/attendees';
import { TopicsReducer } from './reducers/topics';

export const rootReducer = combineReducers({
  events: EventsReducer,
  attendees: AttendeesReducer,
  topics: TopicsReducer
});
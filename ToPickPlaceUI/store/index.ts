import { combineReducers } from 'redux';
import { EventsReducer } from './reducers/events'
import { AttendeesReducer } from './reducers/attendees';

export const rootReducer = combineReducers({
  events: EventsReducer,
  attendees: AttendeesReducer
})

export type AppState = ReturnType<typeof rootReducer>
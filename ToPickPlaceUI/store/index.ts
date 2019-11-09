import { combineReducers } from 'redux';
import { EventsReducer } from './reducers/events'

export const rootReducer = combineReducers({
  events: EventsReducer
})

export type AppState = ReturnType<typeof rootReducer>
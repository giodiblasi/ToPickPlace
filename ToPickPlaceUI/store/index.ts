import { combineReducers } from 'redux';
import { EventsReducer } from './events/reducers'

export const rootReducer = combineReducers({
  events: EventsReducer
})

export type AppState = ReturnType<typeof rootReducer>
import { combineReducers } from 'redux';

import { CounterReducer } from './counter/reducers'
import { EventsReducer } from './events/reducers'

export const rootReducer = combineReducers({
  counter: CounterReducer,
  events: EventsReducer
})

export type AppState = ReturnType<typeof rootReducer>
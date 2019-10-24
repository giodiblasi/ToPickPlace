import {
    DEC_COUNTER,
    INC_COUNTER,
    CounterState,
    CounterActionTypes
  } from './types'
  
  const initialState: CounterState = {
    clicks: 0
  }
  
  export function CounterReducer(
    state = initialState,
    action: CounterActionTypes
  ): CounterState {
    switch (action.type) {
      case INC_COUNTER:
        return {...state, clicks: state.clicks + action.payload}
      case DEC_COUNTER:
        return {...state, clicks: state.clicks - action.payload}
      default:
        return state
    }
  }
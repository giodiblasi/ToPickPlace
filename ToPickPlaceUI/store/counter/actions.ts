import { INC_COUNTER, DEC_COUNTER, CounterActionTypes } from './types'

export function incrementCounter(quantity: number): CounterActionTypes {
  return {
    type: INC_COUNTER,
    payload: quantity
  }
}

export function decrementCounter(quantity: number): CounterActionTypes {
  return {
    type: DEC_COUNTER,
    payload: quantity
  }
}
import { AttendeesState } from "./types"
import { EventsActionTypes, LOAD_ATTENDEES } from "../../actions/events/interfaces"

const initialState: AttendeesState = {
    availables:[]
}
  
  export function AttendeesReducer(
    state = initialState,
    action: EventsActionTypes
  ): AttendeesState {
    switch (action.type) {
      case LOAD_ATTENDEES:     
        return {...state, availables: action.payload}
      default:
        return state
    }
  }
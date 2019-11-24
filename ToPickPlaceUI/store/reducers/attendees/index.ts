import { AttendeesState } from "../../types"
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"
import { SELECT_ATTENDEE, AttendeesActionTypes } from "../../actions/attendees/interfaces"

const initialState: AttendeesState = {
    availables:[],
    selected:undefined
}
  
  export function AttendeesReducer(
    state = initialState,
    action: EventsActionTypes | AttendeesActionTypes
  ): AttendeesState {
    switch (action.type) {
      case SELECT_EVENT:    
        return {...state, availables: action.payload.attendees, selected: undefined}
      case SELECT_ATTENDEE:
        return {...state, selected: action.payload}
      default:
        return state
    }
  }
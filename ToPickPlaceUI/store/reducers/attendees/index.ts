import { AttendeesState } from "../../types"
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"
import { SELECT_ATTENDEE, AttendeesActionTypes } from "../../actions/attendees/interfaces"

const initialState: AttendeesState = {
    availables:[]
}
  
  export function AttendeesReducer(
    state = initialState,
    action: EventsActionTypes | AttendeesActionTypes
  ): AttendeesState {
    switch (action.type) {
      case SELECT_EVENT:    
        return {...state, availables: action.payload.attendees, selectedId: undefined}
      case SELECT_ATTENDEE:
        return {...state, selectedId: action.payload}
      default:
        return state
    }
  }
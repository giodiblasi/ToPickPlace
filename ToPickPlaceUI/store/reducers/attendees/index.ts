import { AttendeesState } from "../../types"
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"

const initialState: AttendeesState = {
    availables:[]
}
  
  export function AttendeesReducer(
    state = initialState,
    action: EventsActionTypes
  ): AttendeesState {
    switch (action.type) {
      case SELECT_EVENT:    
        return {...state, availables: action.payload.attendees}
      default:
        return state
    }
  }
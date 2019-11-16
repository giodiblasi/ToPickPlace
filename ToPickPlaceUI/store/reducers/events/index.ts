import { EventsState } from "./types"
import { EventsActionTypes, LOAD_AVAILABLE_EVENTS, SELECT_EVENT } from "../../actions/events/interfaces"

const initialState: EventsState = {
    availableEvents: [],
    selectedEvent: {
      id:"",
      description:""
    }
  }
  
  export function EventsReducer(
    state = initialState,
    action: EventsActionTypes
  ): EventsState {
    switch (action.type) {
      case LOAD_AVAILABLE_EVENTS:
        return {...state, availableEvents: action.payload}
      case SELECT_EVENT:     
        return {...state, selectedEvent: action.payload}
      default:
        return state
    }
  }
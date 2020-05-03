import { EventsState } from "../../types"
import { EventsActionTypes, LOAD_AVAILABLE_EVENTS, SELECT_EVENT } from "../../actions/events/interfaces"
import { UPDATED_MAP, EventMapActionTypes } from "../../actions/eventMap/interfaces"

const initialState: EventsState = {
    availableEvents: [],
    selectedEvent: {
      id:"",
      description:"",
      name: "",
    }
  }
  
  export function EventsReducer(
    state = initialState,
    action: EventsActionTypes | EventMapActionTypes
  ): EventsState {
    switch (action.type) {
      case LOAD_AVAILABLE_EVENTS:
        return {...state, availableEvents: action.payload}
      case SELECT_EVENT:     
        return {...state, selectedEvent: action.payload}
      case UPDATED_MAP:
          return {...state, selectedEvent: {...state.selectedEvent, eventMap: action.payload}}
      default:
        return state
    }
  }
import { AttendeesState, Attendee } from "../../types"
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"
import { SELECT_ATTENDEE, AttendeesActionTypes, SAVED_ATTENDEE } from "../../actions/attendees/interfaces"
import { AttendeeApiModel } from "../../../api/topickplaceapi/models"

const initialState: AttendeesState = {
    availables:[]
}

 const attendeesApiToModel = (attendees: Array<AttendeeApiModel>): Array<Attendee> => attendees.map(a=>({...a, id: a.id ?? ''}));
  
  export function AttendeesReducer(
    state = initialState,
    action: EventsActionTypes | AttendeesActionTypes
  ): AttendeesState {
    switch (action.type) {
      case SELECT_EVENT:    
        return {...state, availables: attendeesApiToModel(action.payload.attendees), selectedId: undefined}
      case SELECT_ATTENDEE:
        return {...state, selectedId: action.payload}
      case SAVED_ATTENDEE:
        return{
          ...state,
          availables: [...state.availables, action.payload]
        }
      default:
        return state
    }
  }
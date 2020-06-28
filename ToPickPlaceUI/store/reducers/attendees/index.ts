import { AttendeesState, Attendee } from "../../types"
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"
import { SELECT_ATTENDEE, AttendeesActionTypes, SAVED_ATTENDEE } from "../../actions/attendees/interfaces"
import { AttendeeApiModel } from "../../../api/topickplaceapi/models"
import { stat } from "fs"

const initialState: AttendeesState = {
    availables:[]
}

const upsertAttendee = (attendee: Attendee, attendees: Attendee[]) => {
  let existing = false;
  const result = [];
  for(let i=0; i<attendees.length; i++){
    if(attendees[i].id === attendee.id){
      result.push(attendee);
      existing = true;
    }
    else{
      result.push(attendees[i]);
    }
  }
  if(!existing) result.push(attendee);
  return result;
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
          availables: upsertAttendee(action.payload, state.availables)
        }
      default:
        return state
    }
  }
import { AttendeesState, Attendee } from "../../types"
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"
import { SELECT_ATTENDEE, AttendeesActionTypes, SAVED_ATTENDEE, DELETED_ATTENDEE } from "../../actions/attendees/interfaces"
import { AttendeeApiModel } from "../../../api/topickplaceapi/models"
import { upsert } from "../../../utils/utils"
import { stat } from "fs"
import { DELETED_TOPIC, deleteTopicAction, TopicsActionTypes } from "../../actions/topics/interfaces"

const initialState: AttendeesState = {
  availables: []
}


const attendeesApiToModel = (attendees: Array<AttendeeApiModel>): Array<Attendee> => attendees.map(a => ({ ...a, id: a.id ?? '' }));

export function AttendeesReducer(
  state = initialState,
  action: EventsActionTypes | AttendeesActionTypes | TopicsActionTypes
): AttendeesState {
  switch (action.type) {
    case SELECT_EVENT:
      return {
        availables: attendeesApiToModel(action.payload.attendees),
        selectedId: undefined
      }
    case SELECT_ATTENDEE:
      return {
        selectedId: action.payload,
        availables: state.availables
      }
    case SAVED_ATTENDEE:
      return {
        selectedId: state.selectedId,
        availables: upsert(action.payload, state.availables)
      }
    case DELETED_ATTENDEE:
      return {
        selectedId: state.selectedId,
        availables: state.availables.filter(attendee => attendee.id != action.payload)
      }
    case DELETED_TOPIC:
      return {
        availables: [...action.payload.updatedAttendees],
        selectedId: state.selectedId
      }
    default:
      return state
  }
}
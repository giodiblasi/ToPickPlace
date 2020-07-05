import { ModalState, MODALS } from "../../types"
import { AttendeesActionTypes, OPEN_NEW_ATTENDEE_FORM, SAVED_ATTENDEE, OPEN_UPDATE_ATTENDEE_FORM } from "../../actions/attendees/interfaces";
import { ModalActionTypes, CANCEL_OPERATION } from "../../actions/modal/types";
import { OPEN_NEW_TOPIC_FORM, TopicsActionTypes, SAVED_TOPIC, OPEN_UPDATE_TOPIC_FORM } from "../../actions/topics/interfaces";

const initialState: ModalState = {
  opened: false
}

export function ModalReducer(
  state = initialState,
  action: AttendeesActionTypes | TopicsActionTypes | ModalActionTypes
): ModalState {
  switch (action.type) {
    case OPEN_NEW_ATTENDEE_FORM:
      return {
        opened: true,
        type: MODALS.NEW_ATTENDEE
      }
      case OPEN_UPDATE_ATTENDEE_FORM:
        return {
          opened: true,
          type: MODALS.UPDATE_ATTENDEE
        }
    case OPEN_NEW_TOPIC_FORM:
      return {
        opened: true,
        type: MODALS.NEW_TOPIC
      }
    case OPEN_UPDATE_TOPIC_FORM:
      return {
        opened: true,
        type: MODALS.UPDATE_TOPIC
      }
    case CANCEL_OPERATION :
    case SAVED_TOPIC:
    case SAVED_ATTENDEE:
      return { opened: false }
    default:
      return state
  }
}
import { ModalState, MODALS } from "../../types"
import { AttendeesActionTypes, OPEN_NEW_ATTENDEE_FORM, SAVED_ATTENDEE } from "../../actions/attendees/interfaces";
import { ModalActionTypes, CANCEL_OPERATION } from "../../actions/modal/types";
import { OPEN_NEW_TOPIC_FORM, TopicsActionTypes } from "../../actions/topics/interfaces";

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
    case OPEN_NEW_TOPIC_FORM:
      return {
        opened: true,
        type: MODALS.NEW_TOPIC
      }
    case CANCEL_OPERATION :
    case SAVED_ATTENDEE:
      return { opened: false }
    default:
      return state
  }
}
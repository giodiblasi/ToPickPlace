import { ModalState, MODALS } from "../../types"
import { AttendeesActionTypes, OPEN_NEW_ATTENDEE_FORM } from "../../actions/attendees/interfaces";
import { ModalActionTypes, CANCEL_OPERATION } from "../../actions/modal/types";

const initialState: ModalState = {
  opened: false
}

export function ModalReducer(
  state = initialState,
  action: AttendeesActionTypes | ModalActionTypes
): ModalState {
  switch (action.type) {
    case OPEN_NEW_ATTENDEE_FORM:
      return {
        opened: true,
        type: MODALS.NEW_ATTENDEE
      }
    case CANCEL_OPERATION:
      return { opened: false }
    default:
      return state
  }
}
import { CANCEL_OPERATION, ModalActionTypes } from "./types";

export const cancelOperation = (): ModalActionTypes => ({
    type: CANCEL_OPERATION
})
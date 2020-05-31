import { SolutionState } from "../../types";
import { GET_SOLUTION, SolutionActionTypes } from "../../actions/solution/interfaces"

const initialState: SolutionState = {
  seats: [],
}

export function SolutionReducer(
  state = initialState,
  action: SolutionActionTypes
): SolutionState {
  switch (action.type) {
    case GET_SOLUTION:
      return {
        seats:[...action.payload.solution]
      }
    default:
      return state
  }
}
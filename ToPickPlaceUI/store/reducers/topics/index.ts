import { TopicsState } from "../../types";
import { EventsActionTypes, SELECT_EVENT } from "../../actions/events/interfaces"

const initialState: TopicsState = {
    availables: [],
}
  
  export function TopicsReducer(
    state = initialState,
    action: EventsActionTypes
  ): TopicsState {
    switch (action.type) {
      case SELECT_EVENT:     
        return { availables: action.payload.topics.sort((topic1, topic2)=> {
          if(topic1.weight < topic2.weight) return 1;
          if(topic1.weight > topic2.weight) return -1;
          return 0;
          }
        )};
      default:
        return state
    }
  }
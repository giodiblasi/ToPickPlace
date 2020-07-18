import { TopicsState, Topic } from "../../types";
import { EventsActionTypes, SELECT_EVENT, NEW_EVENT } from "../../actions/events/interfaces"
import { TopicsActionTypes, SELECT_TOPIC, SAVED_TOPIC, DELETED_TOPIC } from "../../actions/topics/interfaces";
import { upsert } from "../../../utils/utils";

const initialState: TopicsState = {
  availables: [],
}

export function TopicsReducer(
  state = initialState,
  action: EventsActionTypes | TopicsActionTypes
): TopicsState {
  switch (action.type) {
    case SELECT_EVENT:
    case NEW_EVENT:
      return {
        availables: action.payload.topics.sort((topic1, topic2) => {
          if (topic1.weigth < topic2.weigth) return 1;
          if (topic1.weigth > topic2.weigth) return -1;
          return 0;
        }).map(t => ({ ...t, id: t.id ?? '' })),
        selectedId: undefined
      };
    case SELECT_TOPIC:
      return { ...state, selectedId: action.payload }
    case SAVED_TOPIC:
      return {
        selectedId: state.selectedId,
        availables: upsert(action.payload, state.availables)
      };
    case DELETED_TOPIC:
      return {
        availables: state.availables.filter(t=>t.id!=action.payload.topicId),
        selectedId: state.selectedId
      }
    default:
      return state
  }
}
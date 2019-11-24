import {Attendee, AppState, Topic} from '../types';
import { SelectableList } from '../../utils/typeUtils';

const getFromSelectable = <T extends {id: U},U>(list: SelectableList<T,U>):T | undefined =>
    list.availables.find(item=>item.id === list.selectedId)

export const getSelectedAttendee = (state:AppState): Attendee | undefined => getFromSelectable(state.attendees);

export const getSelectedTopic = (state:AppState): Topic | undefined => getFromSelectable(state.topics);

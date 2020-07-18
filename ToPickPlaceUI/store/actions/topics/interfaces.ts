import { Topic, Attendee } from "../../types";

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const OPEN_NEW_TOPIC_FORM = 'OPEN_NEW_TOPIC_FORM';
export const OPEN_UPDATE_TOPIC_FORM = 'OPEN_UPDATE_TOPIC_FORM';
export const SAVED_TOPIC = 'SAVED_TOPIC';
export const DELETED_TOPIC = 'DELETED_TOPIC';

export type selectTopicAction = {
    type: typeof SELECT_TOPIC,
    payload: string
};

export type openNewTopicFormAction = {
    type: typeof OPEN_NEW_TOPIC_FORM,
};
export type openUpdateTopicFormAction = {
    type: typeof OPEN_UPDATE_TOPIC_FORM,
};

export type savedTopicAction = {
    type: typeof SAVED_TOPIC,
    payload: Topic
}

export type deleteTopicAction = {
    type: typeof DELETED_TOPIC,
    payload: {
        topicId: string,
        updatedAttendees: Array<Attendee>
    }
}



export type TopicsActionTypes =  selectTopicAction
                                | openNewTopicFormAction
                                | savedTopicAction
                                | openUpdateTopicFormAction
                                | deleteTopicAction;
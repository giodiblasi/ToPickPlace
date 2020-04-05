import { Topic } from "../../types";

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const OPEN_NEW_TOPIC_FORM = 'OPEN_NEW_TOPIC_FORM';
export const SAVED_TOPIC = 'SAVED_TOPIC';

export type selectTopicAction = {
    type: typeof SELECT_TOPIC,
    payload: string
};

export type openNewTopicFormAction = {
    type: typeof OPEN_NEW_TOPIC_FORM,
};

export type savedTopicAction = {
    type: typeof SAVED_TOPIC,
    payload: Topic
}


export type TopicsActionTypes =  selectTopicAction | openNewTopicFormAction | savedTopicAction;
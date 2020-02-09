export const SELECT_TOPIC = 'SELECT_TOPIC';
export const OPEN_NEW_TOPIC_FORM = 'OPEN_NEW_TOPIC_FORM';

export type selectTopicAction = {
    type: typeof SELECT_TOPIC,
    payload: string
};

export type openNewTopicFormAction = {
    type: typeof OPEN_NEW_TOPIC_FORM,
};


export type TopicsActionTypes =  selectTopicAction | openNewTopicFormAction;
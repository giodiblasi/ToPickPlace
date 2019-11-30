export const SELECT_TOPIC = 'SELECT_TOPIC';

export type selectTopicAction = {
    type: typeof SELECT_TOPIC,
    payload: string
};

export type TopicsActionTypes =  selectTopicAction;
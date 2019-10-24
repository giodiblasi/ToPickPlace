export interface CounterState {
    clicks: number
}

export const INC_COUNTER = 'INC_COUNTER';
export const DEC_COUNTER = 'DEC_COUNTER';

interface IncrementCounterAction{
    type: typeof INC_COUNTER,
    payload: number
};

interface DecrementCounterAction{
    type: typeof DEC_COUNTER,
    payload: number
};

export type CounterActionTypes =  IncrementCounterAction | DecrementCounterAction;
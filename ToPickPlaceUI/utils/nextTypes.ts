import { NextPageContext } from 'next';
import { Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store/types';

export interface NextPageContextWithStore extends NextPageContext{
    store: Store & {dispatch: ThunkDispatch<{}, {}, any>}
}

export interface AppStore{
    getState: ()=>AppState
}

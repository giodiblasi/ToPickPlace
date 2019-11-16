import { NextPageContext } from 'next';
import { Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export interface NextPageContextWithStore extends NextPageContext{
    store: Store & {dispatch: ThunkDispatch<{}, {}, any>}
}

import { NextPageContext } from 'next';
import { Store } from 'redux';

export interface NextPageContextWithStore extends NextPageContext{
    store: Store
}

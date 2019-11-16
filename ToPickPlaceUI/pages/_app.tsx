import React from 'react'
import App, { AppContext } from 'next/app'
import {rootReducer, AppState} from '../store/index'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import withRedux from 'next-redux-wrapper'
import thunk from 'redux-thunk';

const getStore = (initialState: AppState) => createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(thunk)));

export default withRedux(getStore)(
class MyApp extends App {
  static async getInitialProps ({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps};
  }
  render() {
    //@ts-ignore
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>);
  }
});
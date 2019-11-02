import React from 'react'
import App, { AppContext } from 'next/app'
import {rootReducer, AppState} from '../store/index'
import {createStore, Store} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import withRedux, { NextJSAppContext } from 'next-redux-wrapper'
import { NextPageContext } from 'next'

const getStore = (initialState: AppState) => createStore(rootReducer,initialState, composeWithDevTools());

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
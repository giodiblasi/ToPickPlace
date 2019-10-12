import React from 'react'
import App from 'next/app'
import {rootReducer} from '../store/index'
import {createStore, Store} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import withRedux from 'next-redux-wrapper'

const getStore = (initialState) => createStore(rootReducer,initialState, composeWithDevTools());

export default withRedux(getStore)(
class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
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
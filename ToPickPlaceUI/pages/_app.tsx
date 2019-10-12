import React from 'react'
import App from 'next/app'
import {rootReducer} from '../store/index'
import {createStore, Store} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import withRedux from 'next-redux-wrapper'

const getStore = (initialState) => createStore(rootReducer,initialState, composeWithDevTools());

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/

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
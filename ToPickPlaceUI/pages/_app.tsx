import React from 'react'
import App from 'next/app'
import {rootReducer} from '../store/index'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer,composeWithDevTools());

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>);
  }
}

export default MyApp
import React from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import rootSaga from "./src/sagas";

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleWare from "redux-saga";
import reducers from './src/reducers';

export default App = () => {

  const sagaMiddleWare = createSagaMiddleWare()
  const store = createStore(reducers, applyMiddleware(sagaMiddleWare))
  sagaMiddleWare.run(rootSaga);

  return(
    <Provider store={store}>
      <MainStackNavigator/>
    </Provider>
    )
}

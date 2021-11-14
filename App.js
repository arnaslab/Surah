import React from 'react';
import Main from './views/Main';
import { Provider } from 'react-redux';
import store from './store';

export default () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
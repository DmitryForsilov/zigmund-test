import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import createStore from './createStore.js';

export default () => {
  render(
    <Provider store={createStore()}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

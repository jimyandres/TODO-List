import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import todoApp from './redux';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(() =>
  saveState({
    todos: store.getState().todos
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}

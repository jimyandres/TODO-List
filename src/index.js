import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import todoApp from './redux';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(throttle( () =>
  saveState({
    todos: store.getState().todos
  }), 1000)
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

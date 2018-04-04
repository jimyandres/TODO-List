import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import Root from './components/Root'

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}

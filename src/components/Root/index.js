import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import { BrowserRouter, Route } from 'react-router-dom';

const Root = ({store}) =>
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:visibility?" render={() => <App />} />
    </BrowserRouter>
  </Provider>

export default Root;

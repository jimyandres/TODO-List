import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { StitchClientFactory } from 'mongodb-stitch';
import { appId, mongodbService, options } from './mongoDB';
import configureStore from './configureStore';
import Root from './components/Root';

let stitchClientPromise = StitchClientFactory.create(appId, options);

stitchClientPromise.then(stitchClient => {
  let db = stitchClient.service("mongodb", mongodbService).db("todo");
  const store = configureStore();
  let users = db.collection("users");
  let tasks = db.collection("tasks");
  let props = {stitchClient,users,tasks};

  ReactDOM.render(
    <Root store={store} {...props} />,
    document.getElementById('root')
  );
})//.then((stitchClient) => console.log('logged in as: ' + stitchClient))

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}

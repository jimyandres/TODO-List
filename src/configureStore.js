import { createStore, applyMiddleware } from 'redux';
import todoApp from './redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger);
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;

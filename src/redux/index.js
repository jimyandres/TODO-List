import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibility';

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;

import { combineReducers } from 'redux';

import byId, * as fromById from './byId';
import createList, * as fromList from './createList';


const listByVisibility = combineReducers({
  all: createList('all'),
  pending: createList('pending'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByVisibility
});

export default todos;

export const getVisibleTodos = (state, visibility) => {
  const ids = fromList.getIds(state.listByVisibility[visibility]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, visibility) =>
  fromList.getIsFetching(state.listByVisibility[visibility]);

export const getErrorMessage = (state, visibility) =>
  fromList.getErrorMessage(state.listByVisibility[visibility]);

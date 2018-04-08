import { combineReducers } from 'redux';
import todo from './todo';
import omit from 'lodash/omit';

import byId, * as fromById from './byId';
import createList, * as fromList from './createList';


// const allIds = (state = [], action) => {
//   switch (action.type) {
//     // case 'ADD_TODO':
//     //   return [...state, action.id];
//     // case 'DEL_TODO':
//     //   return state.filter(key => key !== action.id);
//     // case 'CLEAR_COMPLETED':
//     //   return state.filter(key => key !== action.Ids.filter(key2 => key2 === key)[0]);
//     default:
//       return state;
//   }
// };

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

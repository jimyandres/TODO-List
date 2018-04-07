import { combineReducers } from 'redux';
import todo from './todo';
import omit from 'lodash/omit';

const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "CHECK_TODO":
    case "EDIT_TODO":
    case "CHECK_ALL":
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      };
    case "DEL_TODO":
      return omit(state,action.id);
    case "CLEAR_COMPLETED":
      return omit(state,action.Ids);
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.id];
    case "DEL_TODO":
      return state.filter(key => key !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter(key => key !== action.Ids.filter(key2 => key2 === key)[0]);
    default:
      return state;
  }
};

const todos = combineReducers({
  byId,
  allIds
});

export default todos;

const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, visibility) => {
  const allTodos = getAllTodos(state);
  switch (visibility) {
    case "all":
      return allTodos;
    case "completed":
      return allTodos.filter(t => t.completed);
    case "pending":
      return allTodos.filter(t => !t.completed);
    default:
      return allTodos;
  }
};

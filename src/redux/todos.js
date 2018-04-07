import { combineReducers } from 'redux';
import todo from './todo';
import omit from 'lodash/omit';

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = {...state};
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    // case 'ADD_TODO':
    // case 'CHECK_TODO':
    // case 'EDIT_TODO':
    // case 'CHECK_ALL':
    //   return {
    //     ...state,
    //     [action.id]: todo(state[action.id], action)
    //   };
    // case 'DEL_TODO':
    //   return omit(state,action.id);
    // case 'CLEAR_COMPLETED':
    //   return omit(state,action.Ids);
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  if (action.visibility !== 'all') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    // case 'ADD_TODO':
    //   return [...state, action.id];
    // case 'DEL_TODO':
    //   return state.filter(key => key !== action.id);
    // case 'CLEAR_COMPLETED':
    //   return state.filter(key => key !== action.Ids.filter(key2 => key2 === key)[0]);
    default:
      return state;
  }
};

const pendingIds = (state = [], action) => {
  if (action.visibility !== 'pending') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.visibility !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByVisibility = combineReducers({
  all: allIds,
  pending: pendingIds,
  completed: completedIds,
});

const todos = combineReducers({
  byId,
  idsByVisibility
});

export default todos;

export const getVisibleTodos = (state, visibility) => {
  const ids = state.idsByVisibility[visibility];
  return ids.map(id => state.byId[id]);
};

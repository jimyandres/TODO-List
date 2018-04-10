import { combineReducers } from 'redux';
import * as handle from './handleTodos';

const createList = (visibility) => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return visibility === action.visibility
          ? action.response.result
          : state;
      case 'ADD_TODO_SUCCESS':
        return visibility !== 'completed'
          ? [...state, action.response.result]
          : state;
      case 'CHECK_TODO_SUCCESS':
        return handle.checked(state, action, visibility);
      case 'DEL_TODO_SUCCESS':
        return visibility !== action.visibility
          ? action.response.result
          : state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.visibility !== visibility) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (visibility !== action.visibility) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;

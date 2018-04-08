import { v4 } from 'uuid'; // generation of RFC4122 UUIDS. Version 4 (random)
import { getIsFetching } from '../redux';
import * as api from '../api';

const fetchTodos = (visibility) => (dispatch, getState) => {
  if (getIsFetching(getState(), visibility)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    visibility,
  });

  return api.fetchTodos(visibility).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        visibility,
        response
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        visibility,
        message: error.message || 'something went wrong!'
      });
    }
  );
}

// Return an objet to dispatch the action type "ADD_TODO"
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

// return an object to dispatch the action type "CHECK_TODO"
const checkTodo = (id) => ({
  type: 'CHECK_TODO',
  id: id
});

// return an object to dispatch the action type "EDIT_TODO"
const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  id: id,
  text: text
});

// return an object to dispatch the action type "DEL_TODO"
const deleteTodo = (id) => ({
  type: 'DEL_TODO',
  id: id
});

// return an object to dispatch the action type "CHECK_ALL"
const checkAll = (completedAll) => ({
  type: 'CHECK_ALL',
  completedAll: completedAll
});

// return an object to dispatch the action to set visibility
const setVisibility = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
});

// return an object to dispatch the action type "CLEAR_COMPLETED"
const clearTodos = (allIdsToDelete) => ({
  type: 'CLEAR_COMPLETED',
  Ids: allIdsToDelete
});

export {
  fetchTodos,
  addTodo,
  checkTodo,
  editTodo,
  deleteTodo,
  checkAll,
  setVisibility,
  clearTodos
};

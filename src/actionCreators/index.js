import { normalize } from 'normalizr';
import * as schema from './schema';
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
        response: normalize(response, schema.arrayOfTodos)
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
const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    });
  });

// return an object to dispatch the action type "CHECK_TODO"
const checkTodo = (id) => (dispatch) =>
  api.checkTodo(id).then(response => {
    dispatch({
      type: 'CHECK_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });

// return an object to dispatch the action type "EDIT_TODO"
const editTodo = (id, text) => (dispatch) =>
  api.editTodo(id, text).then(response => {
    dispatch({
      type: 'EDIT_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });

// return an object to dispatch the action type "DEL_TODO"
const deleteTodo = (id, visibility) => (dispatch) =>
  api.deleteTodo(id, visibility).then(response => {
    dispatch({
      type: 'DEL_TODO_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
    });
  });

// return an object to dispatch the action type "CHECK_ALL"
const checkAll = (completedAll, visibility) => (dispatch) =>
  api.checkAll(completedAll, visibility).then(response => {
    dispatch({
      type: 'CHECK_ALL_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
      completedAll
    });
  });

// return an object to dispatch the action "SET_VISIBILITY_FILTER"
const setVisibility = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
});

// return an object to dispatch the action type "CLEAR_COMPLETED"
const clearTodos = (visibility) => (dispatch) =>
  api.clearTodos(visibility).then(response => {
    console.log('visibility:',visibility);
    dispatch({
      type: 'CLEAR_COMPLETED_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
    });
  });

// return an object to dispatch the action type "GET_COUNT"
const getCount = () => (dispatch) =>
  api.getCount().then(response => {
    dispatch({
      type: 'GET_TODOS_COUNT',
      count: response
    });
  });

export {
  fetchTodos,
  addTodo,
  checkTodo,
  editTodo,
  deleteTodo,
  checkAll,
  setVisibility,
  clearTodos,
  getCount
};

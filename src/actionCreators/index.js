import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../redux';
import * as api from '../api';

const fetchTodos = (visibility, tasks) => (dispatch, getState) => {
  if (getIsFetching(getState(), visibility)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    visibility,
  });

  return api.fetchTodos(visibility, tasks).then(
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
const addTodo = (tasks, text, ownerId) => (dispatch) =>
  api.addTodo(tasks, text, ownerId).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    });
  });

// return an object to dispatch the action type "CHECK_TODO"
const checkTodo = (tasks, id, prevStatus) => (dispatch) =>
  api.checkTodo(tasks, id, prevStatus).then(response => {
    dispatch({
      type: 'CHECK_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });

// return an object to dispatch the action type "EDIT_TODO"
const editTodo = (tasks, id, text) => (dispatch) =>
  api.editTodo(tasks, id, text).then(response => {
    dispatch({
      type: 'EDIT_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });

// return an object to dispatch the action type "DEL_TODO"
const deleteTodo = (tasks, id, visibility) => (dispatch) =>
  api.deleteTodo(tasks, id, visibility).then(response => {
    dispatch({
      type: 'DEL_TODO_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
    });
  });

// return an object to dispatch the action type "CHECK_ALL"
const checkAll = (completedAll, visibility, tasks) => (dispatch) =>
  api.checkAll(completedAll, visibility, tasks).then(response => {
    dispatch({
      type: 'CHECK_ALL_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
      completedAll
    });
  });

// return an object to dispatch the action type "CLEAR_COMPLETED"
const clearTodos = (visibility, tasks) => (dispatch) =>
  api.clearTodos(visibility, tasks).then(response => {
    dispatch({
      type: 'CLEAR_COMPLETED_SUCCESS',
      response: normalize(response, schema.arrayOfTodos),
    });
  });

// return an object to dispatch the action type "GET_COUNT"
const getCount = (tasks) => (dispatch) =>
  api.getCount(tasks).then(response => {
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
  clearTodos,
  getCount
};

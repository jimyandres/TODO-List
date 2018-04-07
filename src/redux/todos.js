import { combineReducers } from 'redux';
import todo from './todo';

/*
  Function to track the actions dispatched to the Redux tree state
  Usit when need to debug or get track of the app actions.

  It asks for the "nextState" gived by the reducer and "action" dispatched
*/
/*
const logState = (nextState, action) => {
  console.log("Action: "+action);
  console.log(nextState);
  return nextState;
};
*/

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
      // return state.map(task => todo(task, action));
    // case "EDIT_TODO":
      // return state.map(task => todo(task, action));
    // case "CHECK_ALL":
      // return state.map(task => todo(task, action));
    case "DEL_TODO":
      return state.filter(i => i.id !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter(i => !i.completed);
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.id];
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

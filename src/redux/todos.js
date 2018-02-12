const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case "CHECK_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    case "EDIT_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        text: action.text,
      };
    case "CHECK_ALL":
      return {
        ...state,
        completed: action.completedAll
      };
    default:
      return state;
  }
}

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

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        todo(undefined, action)
      ];
    case "CHECK_TODO":
      return state.map(task => todo(task, action));
    case "EDIT_TODO":
      return state.map(task => todo(task, action));
    case "CHECK_ALL":
      return state.map(task => todo(task, action));
    case "DEL_TODO":
      return state.filter(i => i.id !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter(i => !i.completed);
    default:
      return state;
  }
}

export default todos;

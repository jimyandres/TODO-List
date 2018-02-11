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

const logState = (nextState, action) => {
  console.log("Action: "+action);
  console.log(nextState);
  return nextState;
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      var nextState = [
        ...state,
        todo(undefined, action)
      ];
      return logState(nextState,action.type);
    case "CHECK_TODO":
      var nextState = state.map(task => todo(task, action));
      return logState(nextState,action.type);
    case "EDIT_TODO":
      var nextState = state.map(task => todo(task, action));
      return logState(nextState,action.type);
    case "CHECK_ALL":
      var nextState = state.map(task => todo(task, action));
      return logState(nextState,action.type);
    case "DEL_TODO":
      const indexOfDelete = state.findIndex(i => (i.id === action.id));
      var nextState = state.filter(i => i.id !== action.id);
      return logState(nextState,action.type);
    default:
      return state;
  }
}

export default todos;

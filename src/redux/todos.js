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
      const indexOfDelete = state.findIndex(i => (i.id === state.id));
      return [
        ...state.slice(0, indexOfDelete),
        ...state.slice(indexOfDelete+1)
      ];
    default:
      return state;
  }
}

export default todos;

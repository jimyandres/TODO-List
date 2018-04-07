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

export default todo;

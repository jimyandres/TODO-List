const appInfo = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TODOS_COUNT':
      return {
        todosCount: action.count
      };
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        ...state.todosCount.pending ++
      };
    case 'CHECK_TODO_SUCCESS':
      if (action.response.entities.todos[action.response.result].completed) {
        return {
          ...state,
          ...state.todosCount.pending --,
          ...state.todosCount.completed ++
        };
      }
      return {
        ...state,
        ...state.todosCount.pending ++,
        ...state.todosCount.completed --
      };
    case 'CHECK_ALL_SUCCESS':
      const {completedAll} = action;
      const {pending, completed} = state.todosCount;
      const todosCount = {
        completed: completedAll ? pending + completed : 0,
        pending: !completedAll ? pending + completed : 0
      };
      return {
        ...state,
        todosCount
      };
    default:
      return state;
  }
};

export default appInfo;

export const getTodosCount = (state) => state.todosCount;

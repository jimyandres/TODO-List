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
    case 'CHECK_TODO_SUCCESS': {
      const isCompleted = action.response.entities.todos[action.response.result].completed;
      const { pending, completed } = state.todosCount;
      const todosCount = {
        completed: isCompleted ? completed + 1 : completed - 1,
        pending: !isCompleted ? pending + 1 : pending - 1
      };
      return {
        ...state,
        todosCount
      };
    }
    case 'CHECK_ALL_SUCCESS': {
      const {completedAll} = action;
      const {completed, pending} = state.todosCount;
      const todosCount = {
        completed: completedAll ? pending + completed : 0,
        pending: !completedAll ? pending + completed : 0
      };
      return {
        ...state,
        todosCount
      };
    }
    case 'CLEAR_COMPLETED_SUCCESS': {
      const todosCount = {
        completed: 0,
        pending: state.todosCount.pending
      };
      return {
        ...state,
        todosCount
      };
    }
    default:
      return state;
  }
};

export default appInfo;

export const getTodosCount = (state) => state.todosCount;

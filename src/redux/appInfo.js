const appInfo = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TODOS_COUNT':
      return {
        todosCount: action.count
      };
    default:
      return state;
  }
};

export default appInfo;

export const getTodosCount = (state) => state.todosCount;

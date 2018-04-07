const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = {...state};
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    // case 'ADD_TODO':
    // case 'CHECK_TODO':
    // case 'EDIT_TODO':
    // case 'CHECK_ALL':
    //   return {
    //     ...state,
    //     [action.id]: todo(state[action.id], action)
    //   };
    // case 'DEL_TODO':
    //   return omit(state,action.id);
    // case 'CLEAR_COMPLETED':
    //   return omit(state,action.Ids);
    default:
      return state;
  }
}

export default byId;


export const getTodo = (state, id) => state[id];

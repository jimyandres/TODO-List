const byId = (state = {}, action) => {
  if (action.response) {
    // if (action.type === 'DEL_TODO_SUCCESS') {
    //   console.log(action.response.entities.todos);
    //   return action.response.entities.todos;
    // }
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
}

export default byId;

export const getTodo = (state, id) => state[id];

const byId = (state = {}, action) => {
  if (action.type === 'GET_TODOS_COUNT_SUCCESS') {
    return state;
  } else
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
}

export default byId;

export const getTodo = (state, id) => state[id];

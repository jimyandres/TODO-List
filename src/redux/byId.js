const byId = (state = {}, action) => {
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
// default:
// return state;

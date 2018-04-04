// Return an objet to dispatch the action type "ADD_TODO"
let todoId = 0;
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: todoId++,
  text
});

// return an object to dispatch the action type "CHECK_TODO"
const checkTodo = (id) => ({
  type: 'CHECK_TODO',
  id: id
});

// return an object to dispatch the action type "EDIT_TODO"
const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  id: id,
  text: text
});

// return an object to dispatch the action type "DEL_TODO"
const deleteTodo = (id) => ({
  type: 'DEL_TODO',
  id: id
});

// return an object to dispatch the action type "CHECK_ALL"
const checkAll = (completedAll) => ({
  type: 'CHECK_ALL',
  completedAll: completedAll
});

// return an object to dispatch the action to set visibility
const setVisibility = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
});

// return an object to dispatch the action type "CLEAR_COMPLETED"
const clearTodos = () => ({
  type: 'CLEAR_COMPLETED'
});

export {
  addTodo,
  checkTodo,
  editTodo,
  deleteTodo,
  checkAll,
  setVisibility,
  clearTodos
};

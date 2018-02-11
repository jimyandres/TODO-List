// Return an objet to dispatch the action type "ADD_TODO"
let todoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: todoId++,
    text
  };
};

// return an object to dispatch the action type "CHECK_TODO"
const checkTodo = (id) => {
  return {
    type: 'CHECK_TODO',
    id: id
  };
}

export {
  addTodo,
  checkTodo
};

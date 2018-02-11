// Return an objet to dispatch the action type "ADD_TODO"
let todoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: todoId++,
    text
  };
};

export {
  addTodo
};

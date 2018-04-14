import { v4 } from 'uuid'; // generation of RFC4122 UUIDS. Version 4 (random)

// This is a fake in-memory implementation of something that would be implemented
// by calling a REST server.

const DELAY = 200;

let fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: false,
  },{
    id: v4(),
    text: 'ho',
    completed: false,
  },{
    id: v4(),
    text: 'ho',
    completed: true,
  }],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

const byVisibility = (visibility) => {
  switch (visibility) {
    case 'all':
      return fakeDatabase.todos;
    case 'pending':
      return fakeDatabase.todos.filter(t => !t.completed);
    case 'completed':
      return fakeDatabase.todos.filter(t => t.completed);
    default:
      throw new Error(`unknown filter: ${visibility}`);
  }
};

export const fetchTodos = (visibility) =>
  delay(DELAY).then(() => {
    // if (Math.random() > 0.5) {
    //   throw new Error('Boom!');
    // }

    return byVisibility(visibility);

  });

export const addTodo = (text) =>
  delay(DELAY).then(() => {
    const todo = {
      id: v4(),
      text: text,
      completed: false,
    };
    fakeDatabase.todos.push(todo);
    return todo;
  });

export const checkTodo = (id) =>
  delay(DELAY).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });

export const editTodo = (id, text) =>
  delay(DELAY).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.text = text;
    return todo;
  });

export const deleteTodo = (id, visibility) =>
  delay(DELAY).then(() => {
    const index = fakeDatabase.todos.findIndex(t => t.id === id);
    if (index > -1) {
      fakeDatabase.todos.splice(index, 1);
    }
    return byVisibility(visibility);
  });

export const getCount = () =>
  delay(DELAY).then(() => {
    const completed = fakeDatabase.todos.filter(t => t.completed).length;
    const pending = fakeDatabase.todos.length - completed;
    return {completed,pending};
  });

export const checkAll = (completedAll, visibility) =>
  delay(DELAY).then(() => {
    fakeDatabase.todos.forEach((x) => x.completed = completedAll);
    return byVisibility(visibility);
  });

export const clearTodos = (visibility) =>
  delay(DELAY).then(() => {
    const indices = fakeDatabase.todos.map((i,k) => i.completed === true ? k : -1 );
    console.log(indices);
    console.log(indices.reverse().map(i => i !== -1 ? fakeDatabase.todos.splice(i, 1) : null));
    console.log(fakeDatabase);
    return byVisibility(visibility);
  });

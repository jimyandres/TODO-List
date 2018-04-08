import { v4 } from 'uuid'; // generation of RFC4122 UUIDS. Version 4 (random)

// This is a fake in-memory implementation of something that would be implemented
// by calling a REST server.

const fakeDatabase = {
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

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    if (Math.random() > 0.5) {
      throw new Error('Boom!');
    }

    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'pending':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`unknown filter: ${filter}`);
    }
  });

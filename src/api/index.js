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

const byVisibility = (visibility, tasks) => {
  switch (visibility) {
    case 'all':
      return tasks.find().execute();
    case 'pending':
      return tasks.find({ completed: { $eq: false }}).execute();
    case 'completed':
      return tasks.find({ completed: { $eq: true }}).execute();
    default:
      throw new Error(`unknown filter: ${visibility}`);
  }
};

const fetchTodos = (visibility, tasks) =>
  byVisibility(visibility, tasks);

const addTodo = (text, ownerId, tasks) =>
  tasks.insertOne({ text: text, completed: false, owner_id: ownerId })
    .then(res => tasks.findOne({_id:res.insertedId}))
    .catch(e => console.error("Error Inserting:",e.message));

const checkTodo = (id) =>
  delay(DELAY).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  });

const editTodo = (id, text) =>
  delay(DELAY).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.text = text;
    return todo;
  });

const deleteTodo = (id, visibility) =>
  delay(DELAY).then(() => {
    const index = fakeDatabase.todos.findIndex(t => t.id === id);
    if (index > -1) {
      fakeDatabase.todos.splice(index, 1);
    }
    return byVisibility(visibility);
  });

const getCount = () =>
  delay(DELAY).then(() => {
    const completed = fakeDatabase.todos.filter(t => t.completed).length;
    const pending = fakeDatabase.todos.length - completed;
    return {completed,pending};
  });

const checkAll = (completedAll, visibility) =>
  delay(DELAY).then(() => {
    fakeDatabase.todos.forEach((x) => x.completed = completedAll);
    return byVisibility(visibility);
  });

const clearTodos = (visibility) =>
  delay(DELAY).then(() => {
    const indices = fakeDatabase.todos.map((i,k) => i.completed === true ? k : -1 );
    indices.reverse().map(i => i !== -1 ? fakeDatabase.todos.splice(i, 1) : null);
    return byVisibility(visibility);
  });

export {
  fetchTodos,
  addTodo,
  checkTodo,
  editTodo,
  deleteTodo,
  getCount,
  checkAll,
  clearTodos,
};

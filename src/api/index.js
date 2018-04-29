const byVisibility = (visibility, tasks) => {
  switch (visibility) {
    case 'all':
      return tasks.find().execute();
    case 'pending':
      return tasks.find({ completed: false }).execute();
    case 'completed':
      return tasks.find({ completed: true }).execute();
    default:
      throw new Error(`unknown filter: ${visibility}`);
  }
};

const fetchTodos = (visibility, tasks) =>
  byVisibility(visibility, tasks);

const addTodo = (tasks, text, ownerId) =>
  tasks.insertOne({ text: text, completed: false, owner_id: ownerId })
    .then(res => tasks.findOne({_id:res.insertedId}))
    .catch(e => console.error("Error Inserting the ToDo:",e.message));

const checkTodo = (tasks, id, prevStatus) =>
  tasks.updateOne({ _id: id }, { $set: { completed: !prevStatus } })
    .then(() => tasks.findOne({_id:id}))
    .catch(e => console.error("Error Checking the ToDo:",e.message));

const editTodo = (tasks, id, text) =>
  tasks.updateOne({ _id: id }, { $set: { text: text } })
    .then(res => tasks.findOne({_id:id}))
    .catch(e => console.error("Error Editing the ToDo:",e.message));

const deleteTodo = (tasks, id, visibility) =>
  tasks.deleteOne({ _id: id })
    .then(() => byVisibility(visibility, tasks))
    .catch(e => console.error("Error Editing the ToDo:",e.message));

const getCount = (tasks) =>
  tasks.count({ completed: false })
    .then((pending) =>
      tasks.count({ completed: true })
        .then((completed) => ({completed,pending}))
    ).catch(e => console.error("Error Getting the Count of ToDos:",e.message));;

const checkAll = (completedAll, visibility, tasks) =>
  tasks.updateMany(null, { $set: { 'completed' : completedAll}})
    .then(() => byVisibility(visibility, tasks))
    .catch(e => console.error("Error Completing all the ToDos:",e.message));

const clearTodos = (visibility, tasks) =>
  tasks.deleteMany({ 'completed' : true})
    .then(() => byVisibility(visibility, tasks))
    .catch(e => console.error("Error Completing all the ToDos:",e.message));

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

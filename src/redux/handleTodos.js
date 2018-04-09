const checked = (state, action) => {
  const { result: checkedId, entities } = action.response
  const { completed } = entities.todos[checkedId];
  const { visibility } = state;

  const shouldRemove = (
    (completed && visibility !== 'pending') ||
    (!completed && visibility !== 'completed')
  );
  return shouldRemove
    ? state.filter(id => id !== checkedId)
    : state;
};

const deleted = (state, action) => {
  const { result: todos } = action.response;
  return todos;
};

export {
  checked,
  deleted,
};

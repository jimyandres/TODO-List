const checked = (state, action, visibility) => {
  const { result: checkedId, entities } = action.response
  const { completed } = entities.todos[checkedId];

  const shouldRemove = (
    (completed && visibility === 'pending') ||
    (!completed && visibility === 'completed')
  );
  
  return shouldRemove
    ? state.filter(id => id.toString() !== checkedId.toString())
    : state;
};

export {
  checked,
};

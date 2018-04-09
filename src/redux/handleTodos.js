const checked = (state, action, visibility) => {
  const { result: checkedId, entities } = action.response
  const { completed } = entities.todos[checkedId];

  const shouldRemove = (
    (completed && visibility === 'pending') ||
    (!completed && visibility === 'completed')
  );
  console.log('shouldRemove',shouldRemove, action);
  return shouldRemove
    ? state.filter(id => id !== checkedId)
    : state;
};

export {
  checked,
};

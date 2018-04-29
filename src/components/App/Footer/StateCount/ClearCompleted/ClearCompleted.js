import React from 'react';
import './ClearCompleted.css';

const ClearCompleted = ({count, visibility, clearTodos, tasks}) => {
  return (
    <button
      className="btn clearTodos"
      onClick={() => clearTodos(visibility,tasks)}
    >
      Clean Up ({count})
    </button>
  );
};

export default ClearCompleted;

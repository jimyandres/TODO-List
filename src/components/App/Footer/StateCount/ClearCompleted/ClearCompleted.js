import React from 'react';
import './ClearCompleted.css';

const ClearCompleted = ({count, visibility, clearTodos}) => {
  return (
    <button
      className="btn clearTodos"
      onClick={() => clearTodos(visibility)}
    >
      Clear Completed ({count})
    </button>
  );
};

export default ClearCompleted;

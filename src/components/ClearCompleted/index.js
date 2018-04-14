import React from 'react';
import './index.css';

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

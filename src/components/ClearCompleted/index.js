import React from 'react';
import { connect } from 'react-redux';
import { clearTodos } from '../../actionCreators';
import './index.css';

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (todos) => dispatch(clearTodos(todos))
  };
};

let ClearCompleted = ({todos, onClick}) => {
  return (
    <button
      className="btn clearTodos"
      onClick={() => onClick(todos.allIds.filter(key => todos.byId[key].completed))}
    >
      Clear Completed ({todos.idsByVisibility.completed.length})
    </button>
  );
};
ClearCompleted = connect(mapStateToProps, mapDispatchToProps)(ClearCompleted);

export default ClearCompleted;

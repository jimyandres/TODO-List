import React from 'react';
import { connect } from 'react-redux';
import { clearTodos } from '../../actionCreators';

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(clearTodos())
  };
};

let ClearCompleted = ({todos, onClick}) => {
  return (
    <a href="#" onClick={onClick}>Clear Completed ({todos.filter(i => i.completed).length})</a>
  );
};
ClearCompleted = connect(mapStateToProps, mapDispatchToProps)(ClearCompleted);

export default ClearCompleted;

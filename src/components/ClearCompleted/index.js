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
    onClick: () => dispatch(clearTodos())
  };
};

let ClearCompleted = ({todos, onClick}) => {
  return (
    <button
      className="btn clearTodos"
      onClick={onClick}
    >
      Clear Completed ({todos.allIds.filter(key => todos.byId[key].completed).length})
    </button>
  );
};
ClearCompleted = connect(mapStateToProps, mapDispatchToProps)(ClearCompleted);

export default ClearCompleted;

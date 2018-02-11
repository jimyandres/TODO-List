import React from 'react';
import { connect } from 'react-redux';
import FilterTodos from '../FilterTodos';
import ClearCompleted from '../ClearCompleted';

const mapStateToProps = (state) => {
  return {todos: state.todos,}
};

let Footer = ({todos}) => {
  return (
    <p>
      {todos.filter(t => !t.completed).length} Items Left,
      <FilterTodos visibility='SHOW_ALL' title='All' />,
      <FilterTodos visibility='SHOW_COMPLETED' title='Completed' />,
      <FilterTodos visibility='SHOW_PENDING' title='Pending' />.
      <ClearCompleted/>
    </p>
  );
};
Footer = connect(mapStateToProps)(Footer);

export default Footer;

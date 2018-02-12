import React from 'react';
import { connect } from 'react-redux';
import FilterTodos from '../FilterTodos';
import ClearCompleted from '../ClearCompleted';
import './index.css';

const mapStateToProps = (state) => {
  return {todos: state.todos,}
};

let Footer = ({todos}) => {
  return (
    <div id="Footer">
      <div id="Filters">
        <FilterTodos visibility='SHOW_ALL' title='All' />
        <FilterTodos visibility='SHOW_COMPLETED' title='Completed' />
        <FilterTodos visibility='SHOW_PENDING' title='Pending' />
      </div>
      <div id="CompletedTasks" className="left">
        {todos.filter(t => !t.completed).length} Items Left
      </div>
      <ClearCompleted/>
    </div>
  );
};
Footer = connect(mapStateToProps)(Footer);

export default Footer;

import React from 'react';
import { connect } from 'react-redux';
import FilterTodos from '../FilterTodos';
import ClearCompleted from '../ClearCompleted';
import './index.css';

const Footer = () =>
  <div id="Footer">
    <div id="Filters">
      <FilterTodos visibility='all' title='All' />
      <FilterTodos visibility='completed' title='Completed' />
      <FilterTodos visibility='pending' title='Pending' />
    </div>
    <CompletedTasks/>
    <ClearCompleted/>
  </div>

const mapStateToProps = (state) => {
  return {todos: state.todos,}
};

let CompletedTasks = ({todos}) =>
  <div id="CompletedTasks" className="left">
    {todos.idsByVisibility.pending.length} Items Left
  </div>

CompletedTasks = connect(mapStateToProps)(CompletedTasks);

export default Footer;

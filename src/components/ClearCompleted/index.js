import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actionCreators';
import { getVisibleTodos } from '../../redux';
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

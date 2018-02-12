import React from 'react';
import { connect } from 'react-redux';
import { setVisibility } from '../../actionCreators';
import './index.css';

const Filter = ({active, onClick, title}) => {
  let btnStyle = "btn ";
  if (active) {
    btnStyle += "active"
  }
  return (
    <button className={btnStyle} onClick={onClick}>{title}</button>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.visibility === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(setVisibility(ownProps.visibility))
  };
};

const FilterTodos = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterTodos;

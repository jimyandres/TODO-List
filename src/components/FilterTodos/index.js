import React from 'react';
import { connect } from 'react-redux';
import { setVisibility } from '../../actionCreators';

const Filter = ({active, onClick, title}) => {
  if (active) {
    return <span>{title}</span>;
  }
  return (
    <a href="#" onClick={onClick}>{title}</a>
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

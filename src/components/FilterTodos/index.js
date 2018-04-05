import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const FilterTodos = ({ visibility, title }) =>

  <NavLink
    to={visibility === 'all' ? '/' : `/${visibility}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'red'
    }}
  >
    { title }
  </NavLink>
;

const Filter = ({active, onClick, title}) => {
  let btnStyle = "btn ";
  if (active) {
    btnStyle += "active"
  }
  return (
    <button className={btnStyle} onClick={onClick}>{title}</button>
  );
};





//
// import { connect } from 'react-redux';
// import { setVisibility } from '../../actionCreators';
//
//
// const mapStateToProps = (state, ownProps) => ({
//   active: ownProps.visibility === state.visibilityFilter,
// });
//
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick() {
//     dispatch(setVisibility(ownProps.visibility))
//   }
// });
//
// const FilterTodos = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterTodos;

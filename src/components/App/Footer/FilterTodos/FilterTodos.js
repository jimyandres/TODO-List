import React from 'react';
import { NavLink } from 'react-router-dom';
import './FilterTodos.css';

const FilterTodos = ({ visibility, title }) =>
  <NavLink
    exact
    to={visibility === 'all' ? '/' : `/${visibility}`}
    className="btn"
    activeClassName="active"
  >
    { title }
  </NavLink>

export default FilterTodos;

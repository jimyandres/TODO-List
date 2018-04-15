import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

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

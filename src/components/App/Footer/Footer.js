import React from 'react';
import FilterTodos from './FilterTodos';
import StateCount from './StateCount';
import './Footer.css';

const Footer = (props) =>
  <div id="Footer" className='footer'>
    <div id="Filters">
      <FilterTodos visibility='all' title='All' />
      <FilterTodos visibility='completed' title='Completed' />
      <FilterTodos visibility='pending' title='Pending' />
    </div>
    <StateCount {...props}/>
  </div>

export default Footer;

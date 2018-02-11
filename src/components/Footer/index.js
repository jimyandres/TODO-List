import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {todos: state.todos,}
};

let Footer = ({todos}) => {
  return (
    <p>
      {todos.filter(t => !t.completed).length} Items Left
    </p>
  );
};
Footer = connect(mapStateToProps)(Footer);

export default Footer;

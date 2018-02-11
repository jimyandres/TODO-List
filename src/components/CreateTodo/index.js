import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { addTodo } from '../../actionCreators';

let CreateTodo = ({dispatch}) => {
  let todoText;

  return (
    <div>
      <input ref={node => todoText = node} />
      <button onClick={() => {
        dispatch(addTodo(todoText.value));
        todoText.value = '';
      }}
      >
          add
      </button>
    </div>
  );
};
CreateTodo = connect()(CreateTodo);

export default CreateTodo;

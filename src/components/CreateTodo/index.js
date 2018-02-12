import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { addTodo } from '../../actionCreators';

let CreateTodo = ({dispatch}) => {
  let todoText;

  return (
    <div className="divInput">
      <input
        className="input"
        placeholder="Add a new task!"
        ref={node => todoText = node} onKeyPress= {(e) => {
        if (e.key === "Enter" && todoText.value !== '') {
          dispatch(addTodo(todoText.value));
          todoText.value = '';
        }
      }}/>
    </div>
  );
};
CreateTodo = connect()(CreateTodo);

export default CreateTodo;

import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { addTodo } from '../../../../actionCreators';

let CreateTodo = ({dispatch, stitchClient, tasks}) => {
  let todoText;
  return (
    <div className="divInput">
      <input
        className="input"
        placeholder="Add a new task!"
        ref={node => todoText = node} onKeyPress= {(e) => {
          const text = todoText.value.trim();
          if (e.key === "Enter" && text !== '') {
            dispatch(addTodo(text, stitchClient.authedId(), tasks));
            todoText.value = '';
          }
      }}/>
    </div>
  );
};
CreateTodo = connect()(CreateTodo);

export default CreateTodo;

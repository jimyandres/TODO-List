import React from 'react';
import TodoCheckbox from '../TodoCheckbox';

const TodoEdit = (props) => {
  const { onChange, onKeyPress, value,...rest } = props;
  return (
    <TodoCheckbox {...rest} >
      <input
        className="input"
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </TodoCheckbox>
  );
};

export default TodoEdit;

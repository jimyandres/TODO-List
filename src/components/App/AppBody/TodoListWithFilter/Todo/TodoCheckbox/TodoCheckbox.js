import React from  'react';

const TodoCheckbox = (props) => {
  const { onMouseEnter, onMouseLeave, onClick, checked, id, children} = props;
  return (
    <div
      className="divTodo"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      >
      <div className="checkbox">
        <input
          type="checkbox"
          onClick={onClick}
          checked={checked}
          readOnly={true}
          id={id}
        />
        <label htmlFor={id} className="checkboxLabel"></label>
      </div>
      {children}
    </div>
  );
};

export default TodoCheckbox;

import React from 'react';
import { connect } from 'react-redux';
import { checkTodo } from '../../actionCreators';

const Todo = (props) => {
  const {key, onClick, text} = props;

  return (
    <div key={key}>
      <input type="checkbox" onClick={onClick} />
      {text}
    </div>
  );
};

const TodoList = (props) => {
  const { todos, onTodoCheck } = props;

  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          onClick={() => onTodoCheck(todo.id)}
          {...todo}
        />
      )}
    </ul>
  );
};


const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoCheck: (id) => {
      dispatch(checkTodo(id));
    }
  };
};

const TodoListWithFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListWithFilter;

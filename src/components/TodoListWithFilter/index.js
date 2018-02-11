import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo } from '../../actionCreators';

const Todo = (props) => {
  const {key, onClick, text, checked, children, onMouseOver, onMouseOut} = props;

  return (
    <div key={key} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <input
        type="checkbox"
        onClick={onClick}
        checked={checked}
      />
      {text}
      {'  '}{children}
    </div>
  );
};

class TodoWithDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDelete: false
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({hoverDelete: true});
  }

  onMouseOut() {
    this.setState({hoverDelete: false});
  }

  render () {
    const {onTodoDelete, ...rest} = this.props;
    const {hoverDelete} = this.state;

    return (hoverDelete
      ? <Todo
          onMouseOver={() => this.onMouseOver()}
          onMouseOut={() => this.onMouseOut()}
          {...rest}
        >
          <span onClick={() => onTodoDelete(rest.id)}>X</span>
      </Todo>
      : <Todo
          onMouseOver={() => this.onMouseOver()}
          onMouseOut={() => this.onMouseOut()}
          {...rest}
        />
    );
  }
}

const TodoList = (props) => {
  const { todos, onTodoCheck, ...rest } = props;

  return (
    <ul>
      {todos.map(todo =>
        <TodoWithDelete
          key={todo.id}
          onClick={() => onTodoCheck(todo.id)}
          checked={todo.completed}
          {...todo}
          {...rest}
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
    },
    onTodoDelete: (id) => {
      console.log(id);
      dispatch(deleteTodo(id));
    }
  };
};

const TodoListWithFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListWithFilter;

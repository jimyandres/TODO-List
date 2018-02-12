import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo, editTodo } from '../../actionCreators';

const TodoCheckbox = (props) => {
  const { onClick, checked, children} = props;

  var divstyle = {
    display:'flex',
    justifyContent: 'center'
  };

  return (
    <div style={divstyle}>
      <input
        type="checkbox"
        onClick={onClick}
        checked={checked}
      />
      {children}
    </div>
  );
};

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDelete: false,
      editing: false,
      newText: ''
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.setState({newText: this.props.text});
  }

  handleInput(newText) {
    this.setState({newText: newText});
  }

  onMouseOver() {
    this.setState({hoverDelete: true});
  }

  onMouseOut() {
    this.setState({hoverDelete: false});
  }

  onDoubleClick() {
    this.setState({editing: true})
  }

  handleKeyPress(key) {
    if (key === 'Enter') {
      this.props.onTodoEdit(this.props.id, this.state.newText);
      this.setState({editing: false});
    }
  }

  render () {
    const {onTodoDelete, id, ...rest} = this.props;
    const {hoverDelete, editing, newText} = this.state;
    return (

      <TodoWithInput
        isEditing={editing}
        value={newText}
        text={newText}
        onChange={(e) => this.handleInput(e.target.value)}
        onKeyPress={(e) => this.handleKeyPress(e.key)}

        hoverDelete={hoverDelete}
        onMouseOver={() => this.onMouseOver()}
        onMouseOut={() => this.onMouseOut()}
        onDoubleClick={() => this.onDoubleClick()}
        onTodoDelete={() => onTodoDelete(id)}
        {...rest}
      />
    );
  }
}

const TodoEdit = (props) => {
  const { onChange, onKeyPress, value,...rest } = props;
  return (
    <TodoCheckbox {...rest} >
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </TodoCheckbox>
  );
};

const TodoPlain = (props) => {
  const { onMouseOver, onMouseOut, onDoubleClick, text } = props;
  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onDoubleClick={onDoubleClick}
    >
      {text}
    </div>
  );
}

const TodoDelete = (props) => {
  const { onTodoDelete, ...rest } = props;
  return (
    <TodoCheckbox {...rest}>
      <TodoPlain {...rest} />
      <i onClick={onTodoDelete}> X </i>
    </TodoCheckbox>
  );
};


const withDelete = (Component) =>
  ({hoverDelete, ...rest}) =>
    hoverDelete
    ? <TodoDelete {...rest} />
    : <Component {...rest}>
      <TodoPlain {...rest} />
    </Component>

const TodoWithDelete = withDelete(TodoCheckbox);

const withInput = (Component) =>
  ({isEditing, ...rest}) =>
    isEditing
    ? <TodoEdit {...rest} />
    : <Component {...rest} />

const TodoWithInput = withInput(TodoWithDelete);

const TodoList = (props) => {
  const { todos, onTodoCheck, ...rest } = props;

  return (
    <ul>
      {todos.map(todo =>
        <Todo
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

const getVisibleTodos = (todos, visibility) => {
  switch (visibility) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_PENDING":
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};


const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoCheck: (id) => {
      dispatch(checkTodo(id));
    },
    onTodoDelete: (id) => {
      dispatch(deleteTodo(id));
    },
    onTodoEdit: (id, text) => {
      dispatch(editTodo(id, text));
    }
  };
};

const TodoListWithFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListWithFilter;

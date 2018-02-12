import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo, editTodo } from '../../actionCreators';
import './index.css';

const TodoCheckbox = (props) => {
  const { onMouseOver, onMouseOut, onClick, checked, id, children} = props;
  return (
    <div
      className="divTodo"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      >
      <div class="checkbox">
        <input
          type="checkbox"
          onClick={onClick}
          checked={checked}
          readOnly={true}
          id={id}
        />
        <label for={id} className="checkboxLabel"></label>
      </div>
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
    const text = this.state.newText.trim();
    if (key === 'Enter' && text !== '') {
      this.props.onTodoEdit(this.props.id, text);
      this.setState({editing: false, newText:text});
    }
  }

  render () {
    const {onTodoDelete, id, ...rest} = this.props;
    const {hoverDelete, editing, newText} = this.state;
    return (

      <TodoWithInput
        isEditing={editing}
        id={id}
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
        className="input"
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </TodoCheckbox>
  );
};

const TodoPlain = (props) => {
  const { onDoubleClick, text, checked } = props;
  let todoStyle = "todoText ";
  todoStyle += checked ? "checked" : "";
  return (
    <div
      className={todoStyle}
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
      <div />
      <div className="outer" onClick={onTodoDelete}>
        <div className="inner">
          <label className="labelClose">Delete!</label>
        </div>
      </div>
    </TodoCheckbox>
  );
};

const withDelete = (Component) =>
  ({hoverDelete, ...rest}) =>
    hoverDelete
    ? <TodoDelete {...rest} />
    : <Component {...rest}>
      <TodoPlain {...rest} />
      <div />
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

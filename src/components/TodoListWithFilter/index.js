import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../../redux';
import * as actions from '../../actionCreators';
import FetchError from '../FetchError';
import './index.css';

const TodoCheckbox = (props) => {
  const { onMouseOver, onMouseOut, onClick, checked, id, children} = props;
  return (
    <div
      className="divTodo"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
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
    const {onTodoDelete, getCount, id, visibility, ...rest} = this.props;
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
        onTodoDelete={() => {onTodoDelete(id, visibility); getCount();}}
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

class TodoListWithFilter extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    console.log('from todolist', prevProps);
    if (this.props.visibility !== prevProps.visibility) {
      this.fetchData();
    }
  }

  fetchData() {
    const { visibility, fetchTodos } = this.props;
    fetchTodos(visibility).then(() => console.log('done!'));
  }

  render() {
    const {checkTodo, deleteTodo, getCount, editTodo, isFetching, errorMessage, todos, visibility} = this.props;

    if (isFetching && !todos.length) {
      return <Loading />;
    }

    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return (
      <TodoList
        onTodoCheck={checkTodo}
        onTodoDelete={deleteTodo}
        onTodoEdit={editTodo}
        getCount={getCount}
        todos={todos}
        visibility={visibility}
      />
    );
  }
}

const Loading = () =>
  <div className="loader loader--style1" title="0">
    <svg id="loader-1" width="40px" height="40px">
      <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"/>
      </path>
    </svg>
  </div>

const mapStateToProps = (state, {match}) => {
  const visibility = match.params.visibility || 'all';
  return {
    todos: getVisibleTodos(state, visibility),
    errorMessage: getErrorMessage(state, visibility),
    isFetching: getIsFetching(state, visibility),
    visibility,
  };
};

TodoListWithFilter = withRouter(connect(
  mapStateToProps,
  actions
)(TodoListWithFilter));

export default TodoListWithFilter;

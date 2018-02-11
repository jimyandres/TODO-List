import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo, editTodo } from '../../actionCreators';

const Todo = (props) => {
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

class TodoWithDelete extends Component {
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
    const {text} = this.props;
    this.setState({newText: text});
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

      editing
      ? <Todo {...rest}>
          <div key={id}>
            <input
              type="text"
              value={newText}
              onChange={(e) => this.handleInput(e.target.value)}
              onKeyPress={(e) => this.handleKeyPress(e.key)}
            />
          </div>
      </Todo>
      : hoverDelete
        ? <Todo {...rest}>
            <div
              key={id}
              onMouseOver={() => this.onMouseOver()}
              onMouseOut={() => this.onMouseOut()}
              onDoubleClick={() => this.onDoubleClick()}
            >
              {newText}
            </div>
            <i onClick={() => onTodoDelete(id)}>X</i>
        </Todo>
        : <Todo {...rest}>
            <div
              key={id}
              onMouseOver={() => this.onMouseOver()}
              onMouseOut={() => this.onMouseOut()}
              onDoubleClick={() => this.onDoubleClick()}
            >
              {newText}
            </div>
        </Todo>
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

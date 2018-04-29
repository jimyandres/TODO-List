import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../../../../redux';
import * as actions from '../../../../actionCreators';
import FetchError from './FetchError';
import Todo from './Todo';
import Loading from './Loading';
import './TodoListWithFilter.css';

const TodoList = (props) => {
  const { todos, onTodoCheck, ...rest } = props;
  const noTodos = !(todos.length > 0);
  return (
    <ul>
      {noTodos
        ? <span>No tasks to show!</span>
        : todos.map(todo =>
          <Todo
            key={todo._id}
            onClick={() => onTodoCheck(props.tasks, todo._id, todo.completed)}
            checked={todo.completed}
            {...todo}
            {...rest}
          />
        )
      }
    </ul>
  );
};

class TodoListWithFilter extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.visibility !== prevProps.visibility) {
      this.fetchData();
    }
  }

  fetchData() {
    const { visibility, fetchTodos, tasks } = this.props;
    fetchTodos(visibility, tasks);
  }

  render() {
    const {checkTodo, deleteTodo, getCount, editTodo, isFetching, errorMessage, todos, visibility, tasks} = this.props;

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
        tasks={tasks}
      />
    );
  }
}

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

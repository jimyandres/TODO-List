import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClearCompleted from './ClearCompleted';
import CompletedTasks from './CompletedTasks';
import { getTodosCount } from '../../../../redux';
import * as actions from '../../../../actionCreators';
import { withRouter } from 'react-router';

class StateCount extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pending: 0,
      completed: 0
    }
    this.getData = this.getData.bind(this);
  }

  componentDidMount () {
    this.getData();
  }

  shouldComponentUpdate (nextProps) {
    return (
      typeof (this.props.todosCount) !== 'undefined' &&
      (nextProps.todosCount.pending !== this.state.pending ||
      nextProps.todosCount.completed !== this.state.completed));
  }
  componentDidUpdate() {
    const { todosCount } = this.props;
    this.setState({
      pending: todosCount.pending,
      completed: todosCount.completed
    })
  }

  getData () {
    const { getCount } = this.props;
    new Promise((resolve, reject) => {
      resolve(getCount());
    }).then(() => this.setState({
      pending: this.props.todosCount.pending,
      completed: this.props.todosCount.completed
    }));
  }

  render () {
    const { pending, completed } = this.state;
    const { clearTodos, visibility } = this.props;
    return (
      <div>
        <CompletedTasks count={pending} />
        <ClearCompleted count={completed} clearTodos={clearTodos} visibility={visibility} />
      </div>);
  }
}

const mapStateToProps = (state, {match}) => {
  const { visibility = 'all' } = match.params;
  return {
    todosCount: getTodosCount(state),
    visibility
  }
};

StateCount = withRouter(connect(mapStateToProps, actions, null, {pure:false})(StateCount));

export default StateCount;

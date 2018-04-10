import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterTodos from '../FilterTodos';
import ClearCompleted from '../ClearCompleted';
import { getTodosCount } from '../../redux';
import * as actions from '../../actionCreators';
import './index.css';

const Footer = () =>
  <div id="Footer" className='footer'>
    <div id="Filters">
      <FilterTodos visibility='all' title='All' />
      <FilterTodos visibility='completed' title='Completed' />
      <FilterTodos visibility='pending' title='Pending' />
    </div>
    <GetCompletedTasks/>
    <ClearCompleted/>
  </div>

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    todosCount: getTodosCount(state),
  }
};

class GetCompletedTasks extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pending: 0
    }
  }

  componentDidMount () {
    this.getCount();
  }

  shouldComponentUpdate (nextState) {
    return (nextState.todosCount.pending !== this.state.pending);
  }

  componentDidUpdate (prevState) {
    this.getCount();
  }

  getCount () {
    const { getCount,todosCount } = this.props;
    getCount().then(() => this.setState({pending:todosCount.pending}));
  }

  render () {
    const { pending } = this.state;
    return <CompletedTasks count={pending} />;
  }
}

GetCompletedTasks = connect(mapStateToProps, actions)(GetCompletedTasks);


const CompletedTasks = ({count = 0}) =>
  <div id="CompletedTasks" className="left">
    {count} Items Left
  </div>

export default Footer;

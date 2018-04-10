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
    return !(nextState.pending === this.state.pending);
  }

  componentDidUpdate (prevState) {
    this.getCount();
  }

  getCount () {
    const { getCount } = this.props;
    getCount();
  }

  render () {
    const { todosCount = 0 } = this.props;
    return <CompletedTasks count={todosCount.pending} />;
  }
}

GetCompletedTasks = connect(mapStateToProps, actions)(GetCompletedTasks);


const CompletedTasks = ({count = 0}) =>
  <div id="CompletedTasks" className="left">
    {count} Items Left
  </div>

export default Footer;

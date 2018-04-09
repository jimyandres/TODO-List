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
    {/* <CompletedTasks/> */}
    <ClearCompleted/>
  </div>

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    todosCount: getTodosCount(state),
  }
};

class GetCompletedTasks extends Component {
  constructor () {
    super();
    this.state = {
      pendig: 0
    }
  }

  componentDidMount () {
    this.getCount();
  }

  componentDidUpdate () {
    this.getCount();
  }

  getCount () {
    const { getCount } = this.props;
    getCount().then((response) => console.log(response, 'done getCount'));
  }

  render () {
    const {pending} = this.state;
    return <CompletedTasks count={pending} />;
  }
}

const CompletedTasks = ({count}) =>
<div id="CompletedTasks" className="left">
  {count} Items Left
</div>

GetCompletedTasks = connect(mapStateToProps, actions)(GetCompletedTasks);

export default Footer;

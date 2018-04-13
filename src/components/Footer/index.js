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

class GetCompletedTasks extends Component {
  constructor (props) {
    super(props);
    this.state = {
      pending: 0
    }
    this.getData = this.getData.bind(this);
  }

  componentDidMount () {
    this.getData();
  }

  shouldComponentUpdate (nextProps) {
    return (typeof (this.props.todosCount) !== 'undefined' && nextProps.todosCount.pending !== this.state.pending);
  }
  componentDidUpdate() {
    const { todosCount } = this.props;
    this.setState({pending: todosCount.pending})
  }

  getData () {
    const { getCount } = this.props;
    new Promise((resolve, reject) => {
      resolve(getCount());
    }).then(() => this.setState({pending: this.props.todosCount.pending}));
  }

  render () {
    const { pending } = this.state;
    return (<CompletedTasks count={pending} />);
  }
}

const mapStateToProps = (state) => {
  return {
    todosCount: getTodosCount(state),
  }
};

GetCompletedTasks = connect(mapStateToProps, actions, null, { pure: false })(GetCompletedTasks);


const CompletedTasks = ({count = 0}) =>
  <div id="CompletedTasks" className="left">
    {count} Items Left
  </div>

export default Footer;

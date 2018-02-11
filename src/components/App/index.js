import React, { Component } from 'react';
import logo from '../../logo.svg';
import './index.css';

import CreateTodo from '../CreateTodo';
import TodoListWithFilter from '../TodoListWithFilter';

class App extends Component {
  render() {
    return (
      <div className="App">

        <CreateTodo />
        <TodoListWithFilter />

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from '../../logo.svg';
import './index.css';

import CreateTodo from '../CreateTodo';


class App extends Component {
  render() {
    return (
      <div className="App">

        <CreateTodo />

      </div>
    );
  }
}

export default App;

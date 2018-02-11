import React, { Component } from 'react';
import logo from '../../logo.svg';
import './index.css';

import Header from '../Header';
import CreateTodo from '../CreateTodo';
import TodoListWithFilter from '../TodoListWithFilter';
import Footer from '../Footer';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header>
          <CreateTodo />
        </Header>
        <TodoListWithFilter />
        <Footer />

      </div>
    );
  }
}

export default App;

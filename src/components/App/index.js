import React, { Component } from 'react';
import './index.css';

import Header from '../Header';
import CreateTodo from '../CreateTodo';
import TodoListWithFilter from '../TodoListWithFilter';
import Footer from '../Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='AppTitle'>
          <h1>TO DO</h1>
        </div>

        <div>
          <Header>
            <CreateTodo />
          </Header>
          <TodoListWithFilter />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

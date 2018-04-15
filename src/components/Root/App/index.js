import React from 'react';
import './index.css';

import Header from '../Header';
import CreateTodo from '../CreateTodo';
import TodoListWithFilter from '../TodoListWithFilter';
import Footer from '../Footer';

const App = () =>
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

export default App;

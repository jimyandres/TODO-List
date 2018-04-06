import React from 'react';
import './index.css';

import Header from '../Header';
import CreateTodo from '../CreateTodo';
import TodoListWithFilter from '../TodoListWithFilter';
import Footer from '../Footer';

const App = ({match}) =>
  <div className="App">
    <div className='AppTitle'>
      <h1>TO DO</h1>
    </div>

    <div>
      <Header>
        <CreateTodo />
      </Header>
      <TodoListWithFilter
        visibility={ match.params.visibility || 'all' }
      />
    </div>
    <Footer />
  </div>

export default App;

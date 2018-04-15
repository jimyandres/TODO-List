import React from 'react';
import Header from './Header';
import CreateTodo from './CreateTodo';
import TodoListWithFilter from './TodoListWithFilter';

const AppBody = () =>
  <div>
    <Header>
      <CreateTodo />
    </Header>
    <TodoListWithFilter />
  </div>

export default AppBody;

import React from 'react';
import Header from './Header';
import CreateTodo from './CreateTodo';
import TodoListWithFilter from './TodoListWithFilter';

const AppBody = (props) =>
  <div>
    <Header>
      <CreateTodo {...props} />
    </Header>
    <TodoListWithFilter />
  </div>

export default AppBody;

import React from 'react';
import Todo from './Todo';


const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo, completed }) => {
  return (
    <section className="main" hidden={todos.length < 1}>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {
          todos.map(todo => (
            <Todo 
              key={todo.id} 
              todo={todo} 
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo} 
            />
          ))
        }
      </ul>
    </section>
  )
}

export default TodoList;
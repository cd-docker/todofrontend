import React from 'react';
import Todo from './Todo';


const TodoList = ({ todos, updateTodo, deleteTodo, completed }) => {
  return (
    <section className="main" hidden={todos.length < 1}>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {
          todos.filter(todo => (
            (typeof completed === "undefined") 
              ? true
              : todo.completed === completed
          )).map(todo => (
            <Todo 
              key={todo.id} 
              todo={todo} 
              updateTodo={updateTodo}
              deleteTodo={deleteTodo} 
            />
          ))
        }
      </ul>
    </section>
  )
}

export default TodoList;
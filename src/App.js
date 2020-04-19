import React from 'react';
import { useState } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [index, setIndex] = useState(0);
  const [todos, setTodos] = useState([]);
  const [selectionFilter, setSelectionFilter] = useState();

  const addTodo = title => {
    const newTodos = [...todos, { title, id: index, completed: false }];
    setIndex(index + 1);
    setTodos(newTodos);
  }

  const updateTodo = todo => {
    const newTodos = todos.map(item => item.id !== todo.id ? item : todo)
    setTodos(newTodos);
  }

  const deleteTodo = todo => {
    const newTodos = todos.filter(item => item.id !== todo.id);
    setTodos(newTodos);
  }

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <Router>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoForm addTodo={addTodo} />
        </header>
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          completed={selectionFilter} 
        />
        <footer className="footer" hidden={todos.length < 1}>
          <span className="todo-count"><strong>{activeCount}</strong> item(s) left</span>
          <ul className="filters">
            <li>
              <Link 
                to="/" 
                className={`${typeof selectionFilter === "undefined" && "selected"}`} 
                onClick={() => setSelectionFilter(undefined)}>
                All
              </Link>
            </li>
            <li>
              <Link 
                to="/active" 
                className={`${selectionFilter === false && "selected"}`} 
                onClick={() => setSelectionFilter(false)}>
                Active
              </Link>
            </li>
            <li>
              <Link 
                to="/completed"
                className={`${selectionFilter && "selected"}`}
                onClick={() => setSelectionFilter(true)}>
                Completed
              </Link>
            </li>
          </ul>
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://github.com/petehunt/" target="_blank" rel="noopener noreferrer">petehunt</a></p>
        <p>Customized for <a href="http://github.com/cd-docker/todofrontend" target="_blank" rel="noopener noreferrer">Continuous Delivery using Docker</a></p>
      </footer>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { saveTodo, loadTodos, destroyTodo, updateTodo } from './lib/service';
import { filterTodos } from './lib/utils';

function App() {
  const [todos, setTodos] = useState([]);

  const loadData = async() => {
    const { data } = await loadTodos()
    setTodos(data)
  }

  useEffect(() => { loadData() }, [])

  const handleAddTodo = async(title) => {
    const newTodo = {title, completed: false};
    const {data} = await saveTodo(newTodo);
    setTodos(todos.concat(data));
  }

  const handleUpdateTodo = async(todo) => {
    const { data } = await updateTodo(todo)
    const newTodos = todos.map(item => item.id !== todo.id ? item : data)
    setTodos(newTodos);
  }

  const handleDeleteTodo = async(todo) => {
    await destroyTodo(todo.id)
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
          <TodoForm handleAddTodo={handleAddTodo} />
        </header>
        <Route path='/:filter?' render={({match}) =>
          <React.Fragment>
            <TodoList
              todos={filterTodos(match.params.filter, todos)}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
            <footer className="footer" hidden={todos.length < 1}>
              <span className="todo-count">
                <strong>{activeCount}</strong> {todos.length === 1 ? 'item' : 'items'} left
              </span>
              <ul className="filters">
                <li>
                  <Link to="/" className={`${typeof match.params.filter === "undefined" && "selected"}`}>
                    All
                  </Link>
                </li>
                <li>
                  <Link to="/active" className={`${match.params.filter === "active" && "selected"}`}>
                    Active
                  </Link>
                </li>
                <li>
                  <Link to="/completed" className={`${match.params.filter === "completed" && "selected"}`}>
                    Completed
                  </Link>
                </li>
              </ul>
              <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
            </footer>
          </React.Fragment>
        } />
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

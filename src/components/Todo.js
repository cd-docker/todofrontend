import React from 'react';
import { useRef, useState } from 'react';

const Todo = ({ todo, updateTodo, deleteTodo }) => {
  const [baseValue, setBaseValue] = useState(todo.title)
  const [value, setValue] = useState(baseValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const updated = {...todo, title: value}
    updateTodo(updated);
    setBaseValue(value);
    setIsEditing(false);
  }

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      inputElement.current.blur();
      setValue(baseValue);
      setIsEditing(false);
    }
  }

  const handleDelete = e => {
    e.preventDefault();
    deleteTodo(todo);
  }

  const toggleCompleted = e => {
    const updated = {...todo, completed: !todo.completed}
    updateTodo(updated);
  }

  return (
    <li className={`
      ${todo.completed && "completed"}
      ${isEditing && "editing"}
    `}>
      <div className="view">
        <input 
          className="toggle" 
          type="checkbox"
          value={todo.completed}
          onChange={toggleCompleted}
        />
        <label onDoubleClick={() => setIsEditing(true)}>{value}</label>
        <button className="destroy" onClick={handleDelete}></button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputElement}
          className="edit"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </li>
  )
}

export default Todo;
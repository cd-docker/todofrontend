import React from 'react';
import { useRef, useState } from 'react';

const Todo = ({ todo, handleUpdateTodo, handleDeleteTodo }) => {
  const [title, setTitle] = useState(todo.title)
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const updated = {...todo, title: value}
    handleUpdateTodo(updated);
    setTitle(value);
    setIsEditing(false);
  }

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      inputElement.current.blur();
      setValue(title);
      setIsEditing(false);
    }
  }

  const handleDelete = e => {
    e.preventDefault();
    handleDeleteTodo(todo);
  }

  const toggleCompleted = e => {
    const updated = {...todo, completed: !todo.completed}
    handleUpdateTodo(updated);
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
          checked={todo.completed}
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
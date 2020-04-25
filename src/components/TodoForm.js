import React from 'react';
import { useState } from 'react';

const TodoForm = ({ handleAddTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (value) {
      handleAddTodo(value);
      setValue("");
    }
  }

  const handleChange = e => setValue(e.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleChange}
        value={value}
      />
    </form>
  )
}

export default TodoForm;
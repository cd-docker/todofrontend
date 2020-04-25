export const filterTodos = (filter, todos) => filter 
  ? todos.filter(todo => todo.completed === (filter === 'completed')) : todos
import axios from 'axios';

const url = process.env.REACT_APP_API_URL || 'http://localhost:3030/todos'

export const saveTodo = async(todo) => 
  await axios.post(url, todo)

export const loadTodos = async() =>
  await axios.get(url)

export const destroyTodo = async(id) =>
  await axios.delete(`${url}/${id}`)

export const updateTodo = async(todo) =>
  await axios.put(`${url}/${todo.id}`, todo)
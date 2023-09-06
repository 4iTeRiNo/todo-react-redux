import { useState } from 'react'

import './App.css'

import NewFomInput from './components/NewFomInput'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const addTodo = () => {
    if (text.trim().length) {

      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          complete: false,
        }
      ])
      setText('');
    }
  }

  const toggleTodo = (todoId) => {
    setTodos(
      todos.map(todo => {
        if (todo.id !== todoId) return todo;

        return {
          ...todos,
          complete: !todo.complete
        }
      }
      )
    )
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  return (
    <div className='App'>
      <NewFomInput text={text} handleInput={setText} handelSubmit={addTodo} />

      <TodoList  todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  )
}

export default App

import { useState } from 'react'
import { useDispatch } from 'react-redux'


import './App.css'

import { addTodo } from './store/todoSlice'
import NewFomInput from './components/NewFomInput'
import TodoList from './components/TodoList'

function App() {

  const [text, setText] = useState('')

  const dispatch = useDispatch()
  const addTask = () => {
    dispatch(addTodo({ text }));
    setText('');
  };

  return (
    <div className='App'>
      <NewFomInput text={text} handleInput={setText} handelSubmit={addTask} />

      <TodoList />
    </div>
  )
}

export default App

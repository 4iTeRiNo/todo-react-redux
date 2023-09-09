import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'


import './App.css'

import { addNewTodo, fetchTodo } from './store/todoSlice'
import NewFomInput from './components/NewFomInput'
import TodoList from './components/TodoList'

function App() {

  const [text, setText] = useState('')

  const { loading, error } = useAppSelector(state => state.todos)

  const dispatch = useAppDispatch()
  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch])

  return (
    <div className='App'>
      <NewFomInput text={text} handleInput={setText} handelSubmit={addTask} />

      {loading  && <h2>Loading...</h2>}
      {error && <h2>An error occured:{error}</h2>}

      <TodoList />
    </div>
  )
}

export default App

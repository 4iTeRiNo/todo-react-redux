import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import './App.css'

import { addNewTodo, fetchTodo } from './store/todoSlice'
import NewFomInput from './components/NewFomInput'
import TodoList from './components/TodoList'

function App() {

  const [text, setText] = useState('')

  const { status, error } = useSelector(state => state.todos)

  const dispatch = useDispatch()
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

      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured:{error}</h2>}

      <TodoList />
    </div>
  )
}

export default App

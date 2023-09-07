import { useDispatch } from "react-redux"
import { removeTodo, toggleTodo } from "../store/todoSlice"

const TodoItem = ({ id, text, complete }) => {
  const dispatch = useDispatch()
  return (
    <li>
      <input
        type='checkbox'
        checked={complete}
        onChange={() => dispatch(toggleTodo({ id }))}
      />
      <span>{text}</span>
      <span className="delete" onClick={() => dispatch(removeTodo({ id }))}>&times;</span>
    </li>
  )
}

export default TodoItem
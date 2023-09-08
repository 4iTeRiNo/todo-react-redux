import { useDispatch } from "react-redux"
import { deleteTodos, toggleStatus } from "../store/todoSlice"

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch()
  return (
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(deleteTodos(id))}>&times;</span>
    </li>
  )
}

export default TodoItem
const TodoItem = ({ id, text, complete, removeTodo, toggleTodo }) => {
  return (
    <li>
      <input
        type='checkbox'
        checked={complete}
        onChange={() => toggleTodo(id)}
      />
      <span>{text}</span>
      <span className="delete" onClick={() => removeTodo(id)}>&times;</span>
    </li>
  )
}

export default TodoItem
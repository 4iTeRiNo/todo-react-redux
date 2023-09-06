import TodoItem from "./TodoItem";

const TodoList = ({ todos, removeTodo, toggleTodo }) => {
  return (
    <ul>
      {
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            {...todo}
          />
        ))}
    </ul>
  )
}

export default TodoList
# Todo List React App

Remade old vanilla JS project in React. Todo app can create a list item, delete a list item, check an item when completed, and items can be saved in localStorage.

### Original Code

At first I wrote all the logic in the App component. I created a variable `todoListItems` that access state `todos` and iterate through the items in state to create `<li></li>` for the items in state. Then displayed the result in the jsx. `todoListItems` had access to all the function in `App` like `toggleTodo()` and `deleteTodo` but after moving it to seprate components I had some refactoring to do...

```jsx
const todoListItems = todos.map((todo) => {
  const styles = {
    color: todo.completed ? "green" : "white",
  };

  return (
    <li key={todo.id}>
      <label style={styles}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => toggleTodo(todo.id, e.target.checked)}
        />
        {todo.title}
      </label>
      <button onClick={() => deleteTodo(todo.id)} className="btn btn-delete">
        Delete
      </button>
    </li>
  );
});
```

### Refactored in seperate components

Moved the `<ul className="list"></ul>` into seperate component. But now `TodoList()` no longer has access to state `todo` or the functions `toggleTodo` and `deleteTodo`. To Fix this `TodoList` component will have props to access the state and the functions.

```jsx
// TodoList.jsx
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}

      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
```

Moved the `<li key={id}></li>` to a seperate component.

```jsx
// TodoItem.jsx
export default function TodoItem({
  completed,
  id,
  title,
  toggleTodo,
  deleteTodo,
}) {
  const styles = {
    color: completed ? "green" : "white",
  };
  return (
    <li key={id}>
      <label style={styles}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-delete">
        Delete
      </button>
    </li>
  );
}
```

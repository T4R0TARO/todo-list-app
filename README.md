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

- `todos`: an array of todo objects
- `toggleTodo`: a function to toggle the completed status of a todo
- `deleteTodo`: a function to delete a todo

1. The `TodoList` component renders a unorder list `<ul>` with the class name `list`.
2. For each todo in the `todos` array, the `TodoList` component maps over the array and renders a `TodoItem` component.
3. The spread operator `...todo` is used to pass all the properties of the `todo` object as props to the `TodoItem` component.
4. The `key` prop is also passed to each `TodoItem` which is required when rendering lists in React.
5. `toggleTodo` and `deleteTodo` functions are passed as props to each `TodoItem` component
6. `TodoItem` component is imported from seperate file

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

Moved the `<li key={id}></li>` to a seperate component. `TodoItem` component recieves props:

- `completed`: boolean indicating whether the todo item is completed
- `id`: unique identifier for the todo item
- `title`: a string containing the title of the todo item.
- `toggleTodo`: a function that will be called when the checkbox input is clicked. It take two arg: `id` of the todo item and the new `checked` value of the checkbox
- `deleteTodo`: is a function that will be called when the Delete button is clicked. It takes one arg `id` of the todo item.

1. The `TodoItem` component renders a list item `<li>` with the `id` as the `key` prop.
2. Insisde the list item, it renders the same html structure as before but refactored the props so we can access them
3. With destructing I can access the `TodoItem` components props directly into the JSX without access the `todo`

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

import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  console.log(newItem);
  console.log(todos);
  /** MVP
   * Input Form for user to add info about the item
   * Add button to add Item from form
   * List That displays all added items
   * Delete button to delete item
   * Click to mark item as complete
   */

  // Keeps track of changes in the form input
  function handleChange(e) {
    setNewItem(e.target.value);
  }

  // * prevent default re-render
  // add item obj to state `todos`
  // each item has props `id` `title` `completed`
  // clear input back to blank string
  function handleSubmit(e) {
    e.preventDefault();

    setTodos((prevState) => {
      return [...prevState, { id: nanoid(), title: newItem, completed: false }];
    });

    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  const todoListItems = todos.map((todo) => {
    return (
      <li key={todo.id}>
        <label>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => toggleTodo(todo.id, e.target.checked)}
          />
          {todo.title}
        </label>
        <button className="btn btn-delete">Delete</button>
      </li>
    );
  });

  return (
    <main>
      <h1>TODO LIST APP</h1>
      {/* New Item Form */}
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={handleChange}
            id="item"
            type="text"
          />
        </div>
        <button className="add-btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      {/* Todo List Items */}
      <ul className="list">{todoListItems}</ul>
    </main>
  );
}

export default App;

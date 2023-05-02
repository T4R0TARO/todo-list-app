import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  console.log(newItem);
  console.log(todos);
  /** MVP
   * Input Form for user to add info about the item ✅
   * Add button to add Item from form ✅
   * List That displays all added items ✅
   * Delete button to delete item
   * Click to mark item as complete ✅
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

  // toggles checked props for todo items
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

  // Generate JSX and display todo items
  const todoListItems = todos.map((todo) => {
    // if item is checked, font turns green
    const styles = {
      color: todo.completed ? "green" : "white",
    };

    function deleteTodo(id) {
      setTodos((prevState) => {
        return prevState.filter((todo) => todo.id !== id);
      });
    }

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
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todoListItems}
      </ul>
    </main>
  );
}

export default App;

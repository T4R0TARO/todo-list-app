import { useState } from "react";
import { nanoid } from "nanoid";
import NewTodoForm from "./components/NewTodoForm";

import "./App.css";

function App() {
  // const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo(title) {
    setTodos((prevState) => {
      return [...prevState, { id: nanoid(), title, completed: false }];
    });
  }

  // Keeps track of changes in the form input
  // function handleChange(e) {
  //   setNewItem(e.target.value);
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   setTodos((prevState) => {
  //     return [...prevState, { id: nanoid(), title: newItem, completed: false }];
  //   });

  //   setNewItem("");
  // }

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

    // Delete Item
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
      <NewTodoForm addTodo={addTodo} />
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

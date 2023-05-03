import { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  // get localStorage || return empty arr
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  // add todo item obj
  function addTodo(title) {
    setTodos((prevState) => {
      return [...prevState, { id: nanoid(), title, completed: false }];
    });
  }

  // set localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  // Delete Item
  function deleteTodo(id) {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  }

  // ! Generate JSX and display todo items DO NOT USE
  // ! Code has been refactored and broken up into smaller components
  // ! Check TodoList.jsx and TodoItem.jsx
  // const todoListItems = todos.map((todo) => {
  //   // if item is checked, font turns green
  //   const styles = {
  //     color: todo.completed ? "green" : "white",
  //   };

  //   return (
  //     <li key={todo.id}>
  //       <label style={styles}>
  //         <input
  //           type="checkbox"
  //           checked={todo.completed}
  //           onChange={(e) => toggleTodo(todo.id, e.target.checked)}
  //         />
  //         {todo.title}
  //       </label>
  //       <button onClick={() => deleteTodo(todo.id)} className="btn btn-delete">
  //         Delete
  //       </button>
  //     </li>
  //   );
  // });

  return (
    <main>
      <h1>TODO LIST APP</h1>
      <NewTodoForm addTodo={addTodo} />

      {/* Todo List Items */}
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </main>
  );
}

export default App;

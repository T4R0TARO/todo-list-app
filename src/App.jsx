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

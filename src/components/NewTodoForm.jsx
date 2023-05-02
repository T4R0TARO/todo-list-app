import React from "react";
import { useState } from "react";

export default function NewTodoForm(props) {
  const [newItem, setNewItem] = useState("");

  function handleChange(e) {
    setNewItem(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;
    props.addTodo(newItem);

    setNewItem("");
  }
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input value={newItem} onChange={handleChange} id="item" type="text" />
      </div>
      <button className="add-btn">Add</button>
    </form>
  );
}

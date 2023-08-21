"use client";
import React, { useState, useEffect } from "react";
import styles from './page.module.css';



const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
      
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="todo-list" className={styles.todoList}>
  <h1 className={styles.title}>Todo List</h1>

  <form onSubmit={handleSubmit} className={styles.form}>
    <input
      type="text"
      onChange={(e) => setTodo(e.target.value)}
      value={todo}
      className={styles.textInput}
    />
    <button type="submit" className={styles.btn}>Add Todo</button>
  </form>
  
  {todos.map((todoItem) => (
    <div key={todoItem.id} className={styles.todo}>
      <div className={styles.todoText}>
        <input
          type="checkbox"
          id={`completed-${todoItem.id}`}
          checked={todoItem.completed}
          onChange={() => toggleComplete(todoItem.id)}
          className={styles.checkboxInput}
        />
        {todoItem.id === todoEditing ? (
          <input
            type="text"
            onChange={(e) => setEditingText(e.target.value)}
            value={editingText}
            className={styles.textInput}
          />
        ) : (
          <div>{todoItem.text}</div>
        )}
      </div>
      <div className={styles.todoActions}>
        {todoItem.id === todoEditing ? (
          <button onClick={() => submitEdits(todoItem.id)} className={styles.btn}>Submit Edits</button>
        ) : (
          <button onClick={() => setTodoEditing(todoItem.id)} className={styles.btn}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todoItem.id)} className={styles.btn}>Delete</button>
      </div>
    </div>
  ))}
</div>

  );
};

export default App;
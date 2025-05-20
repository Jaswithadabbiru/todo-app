import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")); if (savedTasks) {
    setTasks(savedTasks);
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
  setTasks(tasks.map((task) => task.id === id ? { ...task, text: newText } : task));
};

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🌈 My To-Do List</h1>
        <button className="toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      editTask(task.id, editingText);
                      setEditingId(null);
                    }
                  }}
                  autoFocus
                />
                <button onClick={() => { editTask(task.id, editingText); setEditingId(null); }}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleComplete(task.id)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Mark as completed"
                >
                  {task.text}
                </span>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
                <button onClick={() => { setEditingId(task.id); setEditingText(task.text); }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

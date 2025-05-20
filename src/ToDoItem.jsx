import { useState } from "react";

function ToDoItem({ task, toggleComplete, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    const trimmedText = editedText.trim();
    if (trimmedText !== "") {
      editTask(task.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            autoFocus
          />
          <button onClick={handleSave}>✅</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
        </>
      )}
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
    </li>
  );
}

export default ToDoItem;
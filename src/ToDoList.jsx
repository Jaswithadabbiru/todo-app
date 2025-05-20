function ToDoList({ tasks, toggleComplete, deleteTask, editTask }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet! Add one above 😊</p>;


  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
export default ToDoList;
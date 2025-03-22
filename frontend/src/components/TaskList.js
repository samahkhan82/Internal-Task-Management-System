import React, { useEffect, useState } from "react";
import { fetchTasks, updateTask } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/App.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks().then(({ data }) => setTasks(data));
  }, []);

  const handleStatusChange = async (id) => {
    await updateTask(id, { status: "Completed" });
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task-card ${
            task.status === "Completed" ? "completed" : ""
          }`}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>
            <strong>Assigned To:</strong> {task.assignedTo.name}
          </p>
          <p className="task-status">{task.status}</p>
          {user.role === "manager" && task.status !== "Completed" && (
            <button onClick={() => handleStatusChange(task._id)}>
              Mark Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;

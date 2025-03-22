import React, { useState } from "react";
import { createTask } from "../services/api";
import "../styles/App.css";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(task);
    alert("Task Created Successfully");
  };

  return (
    <div className="container">
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Assign To (Employee ID)"
          onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
          required
        />
        <input
          type="date"
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          required
        />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

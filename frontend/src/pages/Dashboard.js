import React from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskCalendar from "../components/Calendar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sticky Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      {/* Scrollable Content */}
      <div className="dashboard-content">
        <TaskForm />
        <TaskList />
        <TaskCalendar />
      </div>
    </div>
  );
};

export default Dashboard;

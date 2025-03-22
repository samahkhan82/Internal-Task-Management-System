import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { fetchTasks } from "../services/api";
import "react-calendar/dist/Calendar.css";
import "../styles/Calender.css";

const TaskCalendar = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(({ data }) => setTasks(data));
  }, []);

  return (
    <div className="calendar-container">
      <h2>Task Calendar</h2>
      <Calendar
        className="full-width-calendar"
        tileContent={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          const tasksOnDate = tasks.filter(
            (task) => task.deadline.split("T")[0] === formattedDate
          );

          return tasksOnDate.length > 0 ? (
            <div className="task-marker">
              {tasksOnDate.map((task, index) => (
                <span
                  key={index}
                  className="task-dot"
                  title={task.title}
                ></span>
              ))}
            </div>
          ) : null;
        }}
      />
    </div>
  );
};

export default TaskCalendar;

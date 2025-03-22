const Task = require("../models/Task");
const User = require("../models/User");
const sendEmail = require("../config/nodemailer");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;
    const user = await User.findById(assignedTo);
    if (!user)
      return res.status(404).json({ message: "Assigned user not found" });

    const task = new Task({ title, description, assignedTo, deadline });
    await task.save();

    sendEmail(
      user.email,
      "New Task Assigned",
      `Task: ${title}\nDeadline: ${deadline}`
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

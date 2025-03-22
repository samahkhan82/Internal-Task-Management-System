const express = require("express");
const {
  createTask,
  getAllTasks,
  updateTaskStatus,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, createTask);
router.get("/", authMiddleware, getAllTasks);
router.put("/update/:id", authMiddleware, updateTaskStatus);

module.exports = router;

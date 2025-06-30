const express = require('express');
const { createTask, getTasks, getAllTasks, updateTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Route to create a new task
router.post('/', protect, createTask);

// Route to get tasks for the authenticated user
router.get('/me', protect, getTasks);

// Route to get all tasks (admin only)
router.get('/all', protect, authorize('admin'), getAllTasks);

// Route to update a task by ID
router.put('/:id', protect, authorize('admin'), updateTask);

module.exports = router;
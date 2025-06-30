const Task = require('../models/Task');

// POST /api/tasks
exports.createTask = async (req, res) => {
    const task = await Task.create({
        ...req.body,
        owner: req.user.id // Associate task with the authenticated user
    });
    res.status(201).json(task);
};

// GET /api/tasks/me
exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ owner: req.user.id });
    res.status(200).json(tasks);
};

// GET /api/tasks/all
exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate("owner", "username email"); // Populate owner details
    res.status(200).json(tasks);
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
};
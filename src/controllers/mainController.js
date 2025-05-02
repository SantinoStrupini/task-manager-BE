const Task = require('../models/Task');

const mainController = {
  getAll: async (req, res) => {
    const userId = req.user.id;

    try {
      const tasks = await Task.find({ user: userId });

      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this user' });
      }

      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching tasks');
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const task = await Task.findOne({ _id: id, user: userId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching the task');
    }
  },

  create: async (req, res) => {
    const { title, description, state } = req.body;
    const userId = req.user.id;

    try {
      const newTask = await Task.create({
        title,
        description,
        state,
        user: userId,
        createdDate: new Date()
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating the task');
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { title, description, state } = req.body;
    const userId = req.user.id;

    try {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id, user: userId },
        { title, description, state },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating the task');
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });

      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting the task');
    }
  }
};

module.exports = mainController;

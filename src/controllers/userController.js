const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');
const User = require('../models/User');

const userController = {
  register: async (req, res) => {
    const { userName, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'The user already exists' });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        userName,
        email,
        password: hashPassword
      });

      await newUser.save();

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating user', error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Incorrect password or email' });
      }

      const token = jwt.encode(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
      );

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error logging in user', error });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await User.find({}, '-password');
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving users', error });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving user', error });
    }
  }
};

module.exports = userController;

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for users
let users = [];
let idCounter = 1;

// GET endpoint to list all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET endpoint to get a user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// POST endpoint to create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: idCounter++,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
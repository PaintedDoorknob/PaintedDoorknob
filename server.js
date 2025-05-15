const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const PORT = 3000;

// TEMP user storage (in-memory)
const users = [];

// SIGN UP
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'Username already taken' });
  }

  users.push({ username, password });
  res.status(201).json({ message: 'Account created', username });
});

// LOGIN
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Wrong username or password' });
  }

  res.status(200).json({ message: 'Login successful', username });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

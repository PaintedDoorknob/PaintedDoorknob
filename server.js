const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Extra safety

// ========== Simulated Login ==========
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'test@example.com' && password === 'password123') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// ========== Forum Post System ==========
let posts = [];

// Handle post creation
app.post('/api/posts', (req, res) => {
  const { title, content, username } = req.body;

  if (!title || !content || !username) {
    return res.status(400).json({ error: 'Title, content, and username are required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    username,
    createdAt: new Date()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Handle fetching posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// ========== Start the Server ==========
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can change this if needed

// Use middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json()); // Extra safety with modern syntax

// ========== Simulated Login Route ==========
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulated login check
  if (email === 'test@example.com' && password === 'password123') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// ========== Forum Post System ==========
let posts = [];

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    createdAt: new Date()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// ========== Start the Server ==========
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

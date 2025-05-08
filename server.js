// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const posts = []; // In-memory array (resets if server restarts)

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a new post
app.post('/api/posts', (req, res) => {
  const { title, content, username } = req.body;

  if (!title || !content || !username) {
    return res.status(400).json({ error: 'Title, content, and username are required.' });
  }

  const newPost = {
    _id: Date.now().toString(),
    title,
    content,
    username,
    createdAt: new Date(),
    comments: []
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Get all posts (including comments)
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Add a comment to a specific post
app.post('/api/posts/:id/comment', (req, res) => {
  const { comment, username } = req.body;
  const post = posts.find(p => p._id === req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (!comment || !username) {
    return res.status(400).json({ error: 'Comment and username are required.' });
  }

  const newComment = {
    comment,
    username,
    createdAt: new Date()
  };

  post.comments.push(newComment);
  res.status(201).json(newComment);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

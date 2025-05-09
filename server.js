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
    comments: [] // Initialize with no comments
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
    _id: Date.now().toString(),
    comment,
    username,
    createdAt: new Date(),
    likes: 0 // Initial like count for new comments
  };

  post.comments.push(newComment);
  res.status(201).json(newComment);
});

// Like a comment on a specific post
app.post('/api/posts/:postId/comment/:commentId/like', (req, res) => {
  const post = posts.find(p => p._id === req.params.postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const comment = post.comments.find(c => c._id === req.params.commentId);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });

  comment.likes += 1; // Increment the like count for the comment
  res.json({ likes: comment.likes });
});

// Start the server (only once!)
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

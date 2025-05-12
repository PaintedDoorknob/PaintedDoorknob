const express = require('express');
const mongoose = require('mongoose');
const path = require('path');  // Add this to resolve file paths
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from 'public' folder

// MongoDB setup
mongoose.connect('mongodb://127.0.0.1:27017/painteddoorknob', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve HTML files from routes (outside public)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Serve index.html when visiting the root URL
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));  // Serve login.html
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));  // Serve signup.html
});

// Other routes for serving files
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));  // Serve home.html for logged-in users
});

// Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  username: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// Public API: anyone can view posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load posts' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

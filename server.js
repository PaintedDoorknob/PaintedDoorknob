const express = require('express');
const mongoose = require('mongoose');
const path = require('path');  // To resolve file paths
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB setup
mongoose.connect('mongodb://127.0.0.1:27017/painteddoorknob', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve HTML pages using routes (not from the public folder)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Serve index.html for homepage
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));  // Serve login.html for login page
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));  // Serve signup.html for signup page
});

// Other routes for your app
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));  // Serve home.html after login
});

// Static assets (CSS, JS) served from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Post schema (for storing posts in MongoDB)
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  username: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// API for fetching posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load posts' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

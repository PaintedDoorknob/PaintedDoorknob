const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// MongoDB setup
mongoose.connect('mongodb://127.0.0.1:27017/painteddoorknob', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

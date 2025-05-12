const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.static('public'));

// Session middleware
app.use(session({
  secret: 'painteddoorknob-secret',
  resave: false,
  saveUninitialized: true
}));

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

// --- Public API ---
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load posts' });
  }
});

// --- Serve HTML pages ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/home', (req, res) => {
  // You could check if the user is logged in here later
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

// --- Simple fake login logic ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // TEMP: Replace this with real auth later
  if (username && password) {
    req.session.username = username;
    res.redirect('/home'); // redirect to logged-in homepage
  } else {
    res.status(401).send('Login failed. Please check credentials.');
  }
});

// --- Run the server ---
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

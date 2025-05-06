body-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// ===== Middleware =====
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Multer Setup for Uploads =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ===== Dummy Login System =====
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'test@example.com' && password === 'password123') {
    req.session.username = 'TestUser';
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// ===== Simple Auth Middleware =====
function isAuthenticated(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.status(403).json({ error: 'Not logged in' });
  }
}

// ===== Forum Post System =====
let posts = [];

app.post('/api/posts', isAuthenticated, upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    username: req.session.username,
    imageUrl,
    createdAt: new Date()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// ===== Serve Post Form Page =====
app.get('/post.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'post.html'));
});

// ===== Logout =====
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// ===== Start the Server =====
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

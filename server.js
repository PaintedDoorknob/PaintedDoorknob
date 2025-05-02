const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Choose any port

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Example login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // For now, you can just mock a response as if login is successful
  if (email === 'test@example.com' && password === 'password123') {
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

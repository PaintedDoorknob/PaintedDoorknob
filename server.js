// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const posts = []; // Example posts array (replace with a database)

// Use middleware to parse JSON
app.use(bodyParser.json());

// Define the POST route to create a new post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;

  // Validate the request data (you can add more checks here)
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  // Create a new post object
  const newPost = { title, content, username: 'User', createdAt: new Date() };

  // Add the new post to the posts array (or save it to the database)
  posts.push(newPost);

  // Send the new post back in the response with a success status code
  res.status(201).json(newPost);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});

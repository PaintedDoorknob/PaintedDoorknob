document.getElementById('create-post-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form input values
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  // Get the username from localStorage (which was set during login)
  const username = localStorage.getItem('username');
  
  if (!username) {
    alert('You must be logged in to post!');
    return;
  }

  if (title && content) {
    // Create the new post object
    const newPost = { title, content, username };

    // Send the new post data to the server (API call)
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response (e.g., display the new post on the page)
      const forumPostsContainer = document.querySelector('.forum-posts');
      const postCard = document.createElement('div');
      postCard.classList.add('forum-card');
      postCard.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>Posted by ${data.username} on ${new Date(data.createdAt).toLocaleString()}</small>
      `;
      forumPostsContainer.appendChild(postCard);

      // Reset the form after submission
      document.getElementById('create-post-form').reset();
    })
    .catch(err => {
      console.error('Error creating post:', err);
    });
  } else {
    alert('Please fill in both the title and content fields.');
  }
});

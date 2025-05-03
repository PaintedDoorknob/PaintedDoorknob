document.getElementById('create-post-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;

  if (title && content) {
    const newPost = { title, content };

    // Send the data to the server (API call)
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response (add the new post to the page)
      const forumPostsContainer = document.querySelector('.forum-posts');
      const postCard = document.createElement('div');
      postCard.classList.add('forum-card');
      postCard.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>Posted on ${new Date(data.createdAt).toLocaleString()}</small>
      `;
      forumPostsContainer.appendChild(postCard);

      // Reset the form
      document.getElementById('create-post-form').reset();
    })
    .catch(err => {
      console.error('Error creating post:', err);
    });
  } else {
    alert('Please fill in both the title and content fields.');
  }
});

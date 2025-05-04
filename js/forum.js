document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-post-form'); // your original ID
  const postsContainer = document.querySelector('.forum-posts');

  // Load existing posts on page load
  async function loadPosts() {
    try {
      const res = await fetch('http://localhost:3000/api/posts');
      const posts = await res.json();

      postsContainer.innerHTML = ''; // Clear existing content
      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('forum-card');
        postCard.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small>Posted on ${new Date(post.createdAt).toLocaleString()}</small>
        `;
        postsContainer.appendChild(postCard);
      });
    } catch (err) {
      console.error('Error loading posts:', err);
    }
  }

  // Submit new post
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (title && content) {
      const newPost = { title, content };

      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost)
        });

        if (!response.ok) throw new Error('Failed to create post');
        const data = await response.json();

        // Add the new post to the page
        const postCard = document.createElement('div');
        postCard.classList.add('forum-card');
        postCard.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.content}</p>
          <small>Posted on ${new Date(data.createdAt).toLocaleString()}</small>
        `;
        postsContainer.appendChild(postCard);

        form.reset();
      } catch (err) {
        console.error('Error creating post:', err);
      }
    } else {
      alert('Please fill in both the title and content fields.');
    }
  });

  // Load posts initially
  loadPosts();
});

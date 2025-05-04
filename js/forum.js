document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-post-form');
  const postsContainer = document.querySelector('.forum-posts');

  // Check if user is logged in
  const username = localStorage.getItem('username'); // or token, depending on your logic
  if (!username) {
    form.innerHTML = '<p>You must be <a href="login.html">logged in</a> to post.</p>';
    form.querySelector('button')?.remove(); // Optional: remove post button
    return;
  }

  // Handle post submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (!title || !content) {
      alert('Please fill in both fields.');
      return;
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You can add a token here if you start using JWT later
      },
      body: JSON.stringify({ title, content, username })
    });

    if (response.ok) {
      const newPost = await response.json();
      displayPost(newPost);
      form.reset();
    } else {
      alert('Failed to post.');
    }
  });

  // Load existing posts
  async function loadPosts() {
    const res = await fetch('/api/posts');
    const posts = await res.json();
    posts.forEach(displayPost);
  }

  function displayPost(post) {
    const div = document.createElement('div');
    div.classList.add('forum-card');
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Posted by ${post.username || 'Anonymous'} on ${new Date(post.createdAt).toLocaleString()}</small>
    `;
    postsContainer.appendChild(div);
  }

  loadPosts();
});

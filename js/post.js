document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post-form');
  const messageBox = document.getElementById('confirmation-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const username = localStorage.getItem('username') || 'Anonymous';

    if (!title || !content) {
      messageBox.textContent = 'Please fill out both fields.';
      return;
    }

    const newPost = {
      title,
      content,
      username,
      createdAt: new Date().toISOString()
    };

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    messageBox.textContent = 'Post published!';
    form.reset();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const title = form.title.value.trim();
    const content = form.content.value.trim();
    const username = localStorage.getItem('username') || 'Anonymous';

    if (!title || !content) {
      alert('Please fill in both title and content.');
      return;
    }

    const post = {
      id: Date.now(), // Unique ID
      title,
      content,
      username,
      createdAt: new Date().toISOString()
    };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Redirect to home page to view the new post
    window.location.href = 'home.html';
  });
});

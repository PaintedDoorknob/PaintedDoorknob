document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = form.title.value.trim();
    const content = form.content.value.trim();
    const username = localStorage.getItem('username') || 'Guest';

    if (!title || !content) {
      alert('Please fill out all required fields.');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');

    posts.push({
      title,
      content,
      username,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('posts', JSON.stringify(posts));

    // Redirect to homepage to view post
    window.location.href = 'home.html';
  });
});

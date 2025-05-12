document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (!loginForm) {
    console.error('Login form not found!');
    return;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // ✅ Successful login – redirect to logged-in homepage
        window.location.href = 'home.html';
      } else {
        const data = await response.json();
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again later.');
    }
  });
});

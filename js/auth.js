document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Fake login check (for now)
    if (email === '504390@bsd48.org' && password === 'twisterisacutecat') {
      alert('Login successful!');
      window.location.href = 'profile.html'; // or wherever you want
    } else {
      alert('Invalid email or password.');
    }
  });
});

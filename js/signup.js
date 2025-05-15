document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const username = e.target.username.value.trim();
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  if (username.length < 3) {
    alert('Username must be at least 3 characters.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  // Save to localStorage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('userLoggedIn', 'true');

  alert('Sign up successful!');

  // Redirect to logged-in homepage
  window.location.href = 'home.html';
});

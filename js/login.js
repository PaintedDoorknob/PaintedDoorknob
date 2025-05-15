document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const usernameInput = e.target.username.value.trim();
  const passwordInput = e.target.password.value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (usernameInput === storedUsername && passwordInput === storedPassword) {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('username', storedUsername); // refresh just in case
    window.location.href = 'home.html';
  } else {
    alert('Incorrect username or password.');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // SIGN UP
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();

      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill out all fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Check if account already exists
      if (localStorage.getItem(email)) {
        alert("An account with that email already exists.");
        return;
      }

      const userData = { name, email, password };
      localStorage.setItem(email, JSON.stringify(userData)); // Store by email key
      alert('Sign up successful!');
      window.location.href = 'login.html';
    });
  }

  // LOG IN
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      const userData = localStorage.getItem(email); // Get user by email key

      if (!userData) {
        alert('No account found with that email.');
        return;
      }

      const user = JSON.parse(userData);
      if (user.password === password) {
        alert('Login successful!');
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userEmail', email);
        window.location.href = 'home.html'; // Redirect to home page
      } else {
        alert('Incorrect password.');
      }
    });
  }

  // Email format check
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Send the login request to the backend
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Save the username (or email) to localStorage on successful login
      localStorage.setItem('username', email); // You can store the email or a username if you want
      
      // Redirect the user to the homepage (or any other page)
      window.location.href = 'home.html'; // Or your desired page (e.g., forum page)
    } else {
      // Display an error message
      alert(data.message);
    }
  })
  .catch(err => {
    console.error('Login error:', err);
    alert('An error occurred while logging in.');
  });
});

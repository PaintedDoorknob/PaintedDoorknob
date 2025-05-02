document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Grab the email and password values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Send login request to the server
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // If login is successful, hide the login form and show the account page or redirect
      // Option 1: Hide the login form
      document.querySelector('.login-container').style.display = 'none';
      
      // Option 2: Redirect to the account page (e.g., 'profile.html' or 'dashboard.html')
      window.location.href = '/profile'; // Redirect to the profile page after successful login
    } else {
      alert(data.message); // Show error message
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});

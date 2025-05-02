// login.js (you can link this script in your HTML file)
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Make a POST request to the backend
  fetch('http://localhost:3000/login', { // Backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }), // Send user input
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message); // If login is successful
      } else {
        alert(data.message); // Show error message
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

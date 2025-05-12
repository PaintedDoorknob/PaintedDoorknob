document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById("login-form");

  // Check if the user is already logged in (using localStorage or sessionStorage)
  if (localStorage.getItem("userLoggedIn") === "true") {
    window.location.href = "/home";  // Adjust to match your logged-in homepage route
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
      // Here you would usually send the data to your backend API for authentication
      // For now, this is just a fake login
      localStorage.setItem("username", username);
      localStorage.setItem("userLoggedIn", "true");

      // Redirect to logged-in homepage
      window.location.href = "/home";  // Adjust to match your logged-in homepage route
    } else {
      alert("Please enter both username and password.");
    }
  });
});

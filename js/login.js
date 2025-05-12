document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if the username and password match (example logic)
    if (username && password) {
      // Store user info in localStorage to persist session
      localStorage.setItem("username", username);
      localStorage.setItem("userLoggedIn", "true");

      // Redirect to logged-in homepage
      window.location.href = "home.html";
    } else {
      alert("Please enter both username and password.");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Replace this with real login verification if needed
    if (username && password) {
      // Store user session in localStorage (temporary/fake login)
      localStorage.setItem("username", username);
      localStorage.setItem("userLoggedIn", "true");

      // Redirect to logged-in homepage
      window.location.href = "/home";
    } else {
      alert("Please enter both username and password.");
    }
  });
});

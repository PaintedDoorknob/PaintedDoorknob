document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
      // Fake login: save user info to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("userLoggedIn", "true");

      // Redirect to logged-in homepage
      window.location.href = "home.html";
    } else {
      alert("Please enter both username and password.");
    }
  });
});

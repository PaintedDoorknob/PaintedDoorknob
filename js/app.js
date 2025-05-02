document.addEventListener("DOMContentLoaded", () => {
    console.log("App is ready!");

    // Example: Smooth Scroll for Buttons
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Redirecting...');
            // You can add redirection logic here
        });
    });
});
7. js/auth.js – Sign Up & Login Logic
javascript
Copy
Edit
document.getElementById('signup').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (username && email && password) {
        // Save to localStorage (for demo purposes, replace with backend API)
        localStorage.setItem('user', JSON.stringify({ username, email }));
        alert('Sign Up Successful');
        window.location.href = 'login.html';
    }
});

document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
        alert('Login Successful');
        window.location.href = 'profile.html';
    } else {
        alert('Invalid credentials');
    }
});

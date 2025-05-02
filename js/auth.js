document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');

  // Handle form submission
  signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get the input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validation
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

    // Here, you would send the data to a backend (or EmailJS for now)
    sendSignupData(name, email, password);
  });

  // Validate email format
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  // Send data to backend (or EmailJS for notifications)
  function sendSignupData(name, email, password) {
    const userData = {
      name,
      email,
      password
    };

    // This is where EmailJS can be used or you can make a backend request
    // Here’s an example of how to use EmailJS for notifications:
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', userData)
      .then((response) => {
        alert('Sign up successful!');
        window.location.href = 'login.html'; // Redirect to login page
      }, (error) => {
        alert('Error in sending email. Please try again.');
      });
  }
});
3. EmailJS Integration
If you're using EmailJS to send an email after a successful sign-up, you need to:

Sign up for EmailJS and get your Service ID, Template ID, and Public Key.

In auth.js, replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with the actual IDs from EmailJS.

For example:

javascript
Copy
Edit
emailjs.send('service_XXXXXX', 'template_XXXXXX', userData)
You’ll also need to make sure the EmailJS SDK is included in your project. You can do this by adding the following to your HTML’s <head>:

html
Copy
Edit
<script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script type="text/javascript">
  emailjs.init("YOUR_PUBLIC_KEY");  // Replace with your public key
</script>

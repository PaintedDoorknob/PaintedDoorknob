document.addEventListener('DOMContentLoaded', () => {
  const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const username = localStorage.getItem('username') || 'User';

  const headerHTML = `
    <header>
      <nav>
        <div class="logo-container">
          <div class="logo-icon"></div>
          <div class="logo-text">Painted<span>DoorKnob</span></div>
        </div>
        <ul id="nav-links">
          <li><a href="index.html">Home</a></li>
          ${userLoggedIn ? `
            <li><a href="profile.html">Profile</a></li>
            <li><a href="post.html">Post</a></li>
            <li><button id="logout-btn" class="nav-btn">Log Out</button></li>
          ` : `
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="login.html">Log In</a></li>
          `}
        </ul>
      </nav>
    </header>
  `;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  if (userLoggedIn) {
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('username');
      window.location.href = 'index.html';
    });
  }
});

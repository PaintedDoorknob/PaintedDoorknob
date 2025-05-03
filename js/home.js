// Check if the user is logged in and get user info
window.onload = function() {
  const loggedIn = localStorage.getItem('loggedIn');
  if (!loggedIn) {
    window.location.href = "login.html"; // Redirect to login page if not logged in
  }

  // Retrieve user email from localStorage and display user info
  const userEmail = localStorage.getItem('userEmail');
  document.getElementById('userName').textContent = userEmail.split('@')[0]; // Display name before the '@'

  // Simulate fetching forums (This can be replaced with actual data from a database or an API)
  const forums = [
    { title: "Technology Discussion", description: "Talk about the latest in tech.", creator: "JohnDoe" },
    { title: "Gaming Talk", description: "Everything about video games.", creator: "JaneSmith" },
    { title: "Music Lovers", description: "Share and discuss music with others.", creator: "DJBeats" },
    // Add more forums as needed
  ];

  // Populate the forum list
  const forumList = document.getElementById('forumList');
  forums.forEach(forum => {
    const forumItem = document.createElement('div');
    forumItem.classList.add('forum-item');
    forumItem.innerHTML = `
      <a href="#">${forum.title}</a>
      <p>Created by: ${forum.creator}</p>
      <p>${forum.description}</p>
    `;
    forumList.appendChild(forumItem);
  });
};

// Function to filter forums based on search input
function filterForums() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const forumItems = document.querySelectorAll('.forum-item');
  
  forumItems.forEach(item => {
    const title = item.querySelector('a').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Check if the user is logged in
  if (!localStorage.getItem('loggedIn')) {
    window.location.href = 'login.html'; // Redirect to login if not logged in
  }

  // Handle Search
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function () {
    const query = searchInput.value.toLowerCase().trim();
    searchForums(query);
  });

  // Example forum data (replace with actual data from your platform)
  const forums = [
    { name: 'General Discussion', description: 'Talk about anything!' },
    { name: 'Tech Talk', description: 'Discuss the latest in technology' },
    { name: 'Game Reviews', description: 'Share your thoughts on games' },
  ];

  // Display the forums on the home page
  const forumList = document.getElementById('forumList');
  forums.forEach(forum => {
    const forumItem = document.createElement('div');
    forumItem.classList.add('forum-item');
    forumItem.innerHTML = `<a href="#">${forum.name}</a><p>${forum.description}</p>`;
    forumList.appendChild(forumItem);
  });

  // Function to search forums
  function searchForums(query) {
    const filteredForums = forums.filter(forum =>
      forum.name.toLowerCase().includes(query) || forum.description.toLowerCase().includes(query)
    );
    updateForumList(filteredForums);
  }

  // Function to update the forum list
  function updateForumList(filteredForums) {
    forumList.innerHTML = ''; // Clear the existing list
    filteredForums.forEach(forum => {
      const forumItem = document.createElement('div');
      forumItem.classList.add('forum-item');
      forumItem.innerHTML = `<a href="#">${forum.name}</a><p>${forum.description}</p>`;
      forumList.appendChild(forumItem);
    });
  }

  // Logout functionality
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userEmail');
      window.location.href = 'login.html';
    });
  }

});  // <-- This closes the 'DOMContentLoaded' event listener

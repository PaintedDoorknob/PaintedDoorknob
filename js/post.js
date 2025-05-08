document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const imageInput = document.getElementById('image');
    const username = localStorage.getItem('username') || "Anonymous";

    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    const post = {
      id: Date.now(),
      title,
      content,
      username,
      createdAt: new Date().toISOString(),
      image: null // will set below if needed
    };

    const reader = new FileReader();
    if (imageInput.files && imageInput.files[0]) {
      reader.onload = function (event) {
        post.image = event.target.result;
        savePost(post);
      };
      reader.readAsDataURL(imageInput.files[0]); // convert to base64
    } else {
      savePost(post);
    }
  });

  function savePost(post) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post); // newest post on top
    localStorage.setItem('posts', JSON.stringify(posts));
    alert("Post created!");
    window.location.href = "index.html"; // Go back to forum view
  }
});

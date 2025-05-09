// Assume you're getting posts from the backend API

async function loadPosts() {
  const response = await fetch('/api/posts');
  const posts = await response.json();

  const postsContainer = document.getElementById('forum-posts');
  postsContainer.innerHTML = ''; // Clear current posts

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <small>by ${post.username} | ${new Date(post.createdAt).toLocaleString()}</small>
      <p>${post.content}</p>
      <div class="comment-area">
        <input type="text" class="comment-input" id="comment-input-${post._id}" placeholder="Write a comment..." />
        <button class="submit-comment" onclick="submitComment('${post._id}')">Send</button>
      </div>
      <div id="comments-container-${post._id}">
        <!-- Comments will be loaded here -->
      </div>
    `;
    postsContainer.appendChild(postDiv);

    // Load comments for this post
    loadComments(post._id);
  });
}

// Function to submit a new comment
async function submitComment(postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const comment = commentInput.value;
  const username = 'User123'; // Replace with the actual username

  if (!comment) {
    alert('Please enter a comment.');
    return;
  }

  const response = await fetch(`/api/posts/${postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment, username })
  });

  if (response.ok) {
    commentInput.value = ''; // Clear the input field
    loadPosts(); // Reload posts to show the new comment
  } else {
    alert('Failed to submit the comment.');
  }
}

// Function to load comments for a specific post
async function loadComments(postId) {
  const response = await fetch(`/api/posts/${postId}`);
  const post = await response.json();

  const commentsContainer = document.getElementById(`comments-container-${postId}`);
  commentsContainer.innerHTML = '';

  post.comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
      <p><strong>${comment.username}:</strong> ${comment.comment}</p>
    `;
    commentsContainer.appendChild(commentDiv);
  });
}

// Load posts when the page is ready
document.addEventListener('DOMContentLoaded', loadPosts);

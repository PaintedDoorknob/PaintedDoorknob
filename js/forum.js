// Load posts when the page is ready
window.onload = loadPosts;

// Function to fetch and display posts
function loadPosts() {
  fetch('/api/posts')
    .then(response => response.json())
    .then(posts => {
      const forumPostsContainer = document.getElementById('forum-posts');
      forumPostsContainer.innerHTML = '';

      posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <small>Posted by ${post.username} on ${new Date(post.createdAt).toLocaleString()}</small>
          <p>${post.content}</p>
          <div class="comment-area">
            <input class="comment-input" type="text" placeholder="Write a comment..." id="comment-input-${post._id}">
            <button class="submit-comment" onclick="submitComment('${post._id}')">Comment</button>
          </div>
          <div class="comments-container" id="comments-container-${post._id}">
            <!-- Comments will be loaded here -->
          </div>
        `;

        // Display the comments for this post
        post.comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          commentDiv.innerHTML = `
            <p><strong>${comment.username}:</strong> ${comment.comment}</p>
            <button onclick="likeComment('${post._id}', '${comment._id}')">Like (${comment.likes})</button>
          `;
          document.getElementById(`comments-container-${post._id}`).appendChild(commentDiv);
        });

        forumPostsContainer.appendChild(postDiv);
      });
    });
}

// Function to submit a comment
function submitComment(postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const commentText = commentInput.value;
  const username = 'User123'; // Replace this with the actual username (e.g., from session/localStorage)

  if (commentText) {
    fetch(`/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: commentText, username })
    })
      .then(response => response.json())
      .then(comment => {
        loadPosts(); // Reload posts after a new comment is added
      });

    commentInput.value = ''; // Clear the input field after submission
  }
}

// Function to like a comment
function likeComment(postId, commentId) {
  fetch(`/api/posts/${postId}/comment/${commentId}/like`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      loadPosts(); // Reload posts after a like is added
    });
}

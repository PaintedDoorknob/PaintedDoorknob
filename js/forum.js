document.addEventListener('DOMContentLoaded', () => {
  loadPosts(); // Load posts when page is loaded

  // Handle form submission for creating a new post
  const postForm = document.getElementById('post-form');
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const username = 'User'; // Replace with actual logged-in user name

    fetch('https://painteddoorknob.onrender.com/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, username })
    })
      .then(res => res.json())
      .then(data => {
        loadPosts(); // Reload posts after adding new post
        postForm.reset(); // Clear the form
      });
  });
});

// Load all posts with comments and likes
function loadPosts() {
  fetch('https://painteddoorknob.onrender.com/api/posts')
    .then(res => res.json())
    .then(posts => {
      const forumPostsDiv = document.getElementById('forum-posts');
      forumPostsDiv.innerHTML = ''; // Clear existing posts

      posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <small>By ${post.username} - ${new Date(post.createdAt).toLocaleString()}</small>
          <p>${post.content}</p>
          <div class="comment-area" id="comments-${post._id}">
            <input class="comment-input" id="comment-input-${post._id}" placeholder="Add a comment..." />
            <button class="submit-comment" onclick="submitComment(event, '${post._id}')">Comment</button>
            <div class="no-comments">No comments yet</div>
          </div>
        `;
        forumPostsDiv.appendChild(postDiv);

        // Load comments for the post
        post.comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          commentDiv.innerHTML = `
            <p><strong>${comment.username}</strong>: ${comment.comment}</p>
            <button class="like-button" onclick="likeComment('${post._id}', '${comment._id}')">❤️ Like</button>
            <span class="likes-count">${comment.likes} Likes</span>
          `;
          document.getElementById(`comments-${post._id}`).appendChild(commentDiv);
        });
      });
    });
}

// Submit a comment to a post
function submitComment(event, postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const comment = commentInput.value;
  const username = 'User'; // Replace with actual logged-in user name

  if (comment.trim() === '') return;

  fetch(`https://painteddoorknob.onrender.com/api/posts/${postId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment, username })
  })
    .then(res => res.json())
    .then(data => {
      loadPosts(); // Reload posts to show new comment
    });

  commentInput.value = ''; // Clear the comment input
}

// Like a comment
function likeComment(postId, commentId) {
  fetch(`https://painteddoorknob.onrender.com/api/posts/${postId}/comment/${commentId}/like`, {
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => {
      loadPosts(); // Reload posts to show updated likes count
    });
}

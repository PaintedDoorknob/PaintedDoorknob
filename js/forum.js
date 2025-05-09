document.addEventListener("DOMContentLoaded", loadPosts);

function loadPosts() {
  fetch('https://painteddoorknob.onrender.com/api/posts') // Fetch posts from backend
    .then(res => res.json()) // Parse the JSON response
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

function submitComment(event, postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const comment = commentInput.value;
  const username = 'Username'; // Replace with actual user info

  if (!comment.trim()) return;

  fetch(`https://painteddoorknob.onrender.com/api/posts/${postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment,
      username
    })
  })
  .then(res => res.json())
  .then(newComment => {
    commentInput.value = ''; // Clear input field
    loadPosts(); // Reload posts with the new comment
  });
}

function likeComment(postId, commentId) {
  fetch(`https://painteddoorknob.onrender.com/api/posts/${postId}/comment/${commentId}/like`, {
    method: 'POST'
  })
  .then(res => res.json())
  .then(updatedComment => {
    loadPosts(); // Reload posts to reflect the updated like count
  });
}

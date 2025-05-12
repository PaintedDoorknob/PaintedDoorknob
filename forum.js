// Get username from local storage or use "Anonymous"
const currentUsername = localStorage.getItem('username') || 'Anonymous';

// Load posts when the page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadPosts();

  const postForm = document.getElementById('post-form');
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, username: currentUsername })
    });

    if (response.ok) {
      document.getElementById('post-title').value = '';
      document.getElementById('post-content').value = '';
      loadPosts();
    }
  });
});

// Load all posts and comments
async function loadPosts() {
  const response = await fetch('http://localhost:3000/api/posts');
  const posts = await response.json();
  const container = document.getElementById('forum-posts');
  container.innerHTML = '';

  posts.reverse().forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <small>by ${post.username} | ${new Date(post.createdAt).toLocaleString()}</small>
      <p>${post.content}</p>

      <!-- COMMENT BOX -->
      <div class="comment-area">
        <input type="text" class="comment-input" id="comment-input-${post._id}" placeholder="Write a comment..." />
        <button class="submit-comment" onclick="submitComment('${post._id}')">Send</button>
      </div>

      <div id="comments-container-${post._id}">
        ${post.comments.length === 0 ? '<div class="no-comments">No comments yet.</div>' : ''}
        ${post.comments.map(comment => `
          <div class="comment">
            <strong>${comment.username}</strong>: ${comment.comment}
            <br />
            <small>${new Date(comment.createdAt).toLocaleString()}</small>
            <br />
            <button onclick="likeComment('${post._id}', '${comment._id}')">❤️ ${comment.likes || 0}</button>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(postDiv);
  });
}

// Submit a comment
async function submitComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  const comment = input.value.trim();
  if (!comment) return;

  const response = await fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment, username: currentUsername })
  });

  if (response.ok) {
    input.value = '';
    loadPosts();
  }
}

// Like a comment
async function likeComment(postId, commentId) {
  await fetch(`http://localhost:3000/api/posts/${postId}/comment/${commentId}/like`, {
    method: 'POST'
  });
  loadPosts();
}

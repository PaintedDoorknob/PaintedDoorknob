function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <small>By ${post.username}</small>
    <button class="comment-btn">Comment</button>
    <div class="comment-area" style="display: none;">
      <input type="text" placeholder="Write a comment..." class="comment-input" />
      <button class="submit-comment">Submit</button>
    </div>
    <div class="comments-list">
      ${post.comments && post.comments.length
        ? post.comments.map(c => `<div class="comment"><strong>${c.username}</strong>: ${c.text}</div>`).join('')
        : '<div class="no-comments">No comments yet.</div>'
      }
    </div>
  `;

  const commentBtn = postDiv.querySelector('.comment-btn');
  const commentArea = postDiv.querySelector('.comment-area');
  const submitBtn = postDiv.querySelector('.submit-comment');
  const commentInput = postDiv.querySelector('.comment-input');
  const commentsList = postDiv.querySelector('.comments-list');

  // Toggle comment input area
  commentBtn.addEventListener('click', () => {
    commentArea.style.display = commentArea.style.display === 'none' ? 'block' : 'none';
  });

  // Submit comment
  submitBtn.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    const username = localStorage.getItem('username');

    if (!username) {
      alert("You must be logged in to comment.");
      return;
    }

    if (comment === "") {
      alert("Comment cannot be empty.");
      return;
    }

    fetch(`/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment, username })
    })
    .then(res => res.json())
    .then(data => {
      commentInput.value = "";

      const newComment = document.createElement('div');
      newComment.classList.add('comment');
      newComment.innerHTML = `<strong>${username}</strong>: ${comment}`;
      commentsList.appendChild(newComment);

      const noCommentsMsg = commentsList.querySelector('.no-comments');
      if (noCommentsMsg) noCommentsMsg.remove();
    })
    .catch(() => alert("Failed to post comment."));
  });

  return postDiv;
}

function loadPosts() {
  fetch('/api/posts')
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById('forum-posts');
      container.innerHTML = '';
      posts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
      });
    });
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', loadPosts);

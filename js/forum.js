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
    <div class="comments-list"></div>
  `;

  const commentBtn = postDiv.querySelector('.comment-btn');
  const commentArea = postDiv.querySelector('.comment-area');
  const submitBtn = postDiv.querySelector('.submit-comment');
  const commentInput = postDiv.querySelector('.comment-input');

  // Toggle comment input
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
    .then(res => {
      if (res.ok) {
        commentInput.value = "";
        alert("Comment posted!");
        // You can also auto-update the comment list here
      } else {
        alert("Failed to post comment.");
      }
    });
  });

  return postDiv;
}

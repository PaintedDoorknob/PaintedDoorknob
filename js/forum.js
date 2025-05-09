function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <small>By ${post.username} • ${new Date(post.createdAt).toLocaleString()}</small>
    <button class="comment-btn">Comment</button>
    <div class="comment-area" style="display: none;">
      <input type="text" placeholder="Write a comment..." class="comment-input" />
      <button class="submit-comment">Submit</button>
    </div>
    <div class="comments-list">
      ${post.comments && post.comments.length
        ? post.comments.map(c => `
            <div class="comment">
              <strong>${c.username}</strong>: ${c.comment} <small>${new Date(c.createdAt).toLocaleString()}</small>
            </div>`).join('')
        : '<div class="no-comments">No comments yet.</div>'
      }
    </div>
  `;

  const commentBtn = postDiv.querySelector('.comment-btn');
  const commentArea = postDiv.querySelector('.comment-area');
  const submitBtn = postDiv.querySelector('.submit-comment');
  const commentInput = postDiv.querySelector('.comment-input');
  const commentsList = postDiv.querySelector('.comments-list');

  commentBtn.addEventListener('click', () => {
    commentArea.style.display = commentArea.style.display === 'none' ? 'block' : 'none';
  });

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

    fetch('https://painteddoorknob.onrender.com/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: postTitle,
    content: postContent,
    username: currentUsername
  })
})
.then(res => res.json())
.then(data => {
  console.log('Post created:', data);
  // optionally refresh the post list or clear the form
})
.catch(err => {
  console.error('Error creating post:', err);
});
    })
      .then(res => res.json())
      .then(data => {
        commentInput.value = "";

        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `<strong>${username}</strong>: ${comment} <small>${new Date(data.createdAt).toLocaleString()}</small>`;
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
      posts.reverse().forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
      });
    });
}

function handlePostForm() {
  const form = document.getElementById('post-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const username = localStorage.getItem('username') || 'Anonymous';

    if (!title || !content) {
      alert('Title and content are required.');
      return;
    }

    fetch('https://painteddoorknob.onrender.com/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: postTitle,
    content: postContent,
    username: currentUsername
  })
})
.then(res => res.json())
.then(data => {
  console.log('Post created:', data);
  // optionally refresh the post list or clear the form
})
.catch(err => {
  console.error('Error creating post:', err);
});
    })
      .then(res => res.json())
      .then(post => {
        const container = document.getElementById('forum-posts');
        container.prepend(createPostElement(post));
        form.reset();
      })
      .catch(() => alert("Failed to create post."));
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  handlePostForm();
});

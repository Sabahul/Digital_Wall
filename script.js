let boards = [
      
    {
      id: 1,
      title: 'Board 1',
      posts: [
        { id: 1, title: 'Toddle', content: 'One platform for all your teaching-learning needs', likes: 5, bookmarked: false },
        { id: 2, title: 'Chiara Fornetti', content: 'Shifting to Toddle was the best decision we ever made as a school', likes: 200, bookmarked: true },
        { id: 3, title: 'Post 3', content: 'You can add your content here', likes: 10, bookmarked: false }
      ]
    },
    {
      id: 2,
      title: 'Board 2',
      posts: [
        { id: 4, title: 'Why toddle', content: 'Get an edge over your current platform with more features, better support, and a beautiful interface.', likes: 7, bookmarked: false },
        { id: 5, title: 'Post 5', content: 'You can add your content here', likes: 3, bookmarked: true }
      ]
    }
  ];

  function createBoard() {
    const boardTitle = prompt('Enter board title');
    if (boardTitle) {
      const newBoard = {
        id: boards.length + 1,
        title: boardTitle,
        posts: []
      };
      boards.push(newBoard);
      renderBoards();
    }
  }

  function createPost(boardId) {
    const postTitle = prompt('Enter post title');
    const postContent = prompt('Enter post content');
    if (postTitle && postContent) {
      const newPost = {
        id: Date.now(),
        title: postTitle,
        content: postContent,
        likes: 0,
        bookmarked: false
      };
      const board = boards.find(board => board.id === boardId);
      if (board) {
        board.posts.push(newPost);
        renderPosts(boardId);
      }
    }
  }

  function deleteBoard(boardId) {
    const confirmDelete = confirm('Are you sure you want to delete this board?');
    if (confirmDelete) {
      const boardIndex = boards.findIndex(board => board.id === boardId);
      if (boardIndex !== -1) {
        boards.splice(boardIndex, 1);
        renderBoards();
      }
    }
  }

  function deletePost(boardId, postId) {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const board = boards.find(board => board.id === boardId);
      if (board) {
        const postIndex = board.posts.findIndex(post => post.id === postId);
        if (postIndex !== -1) {
          board.posts.splice(postIndex, 1);
          renderPosts(boardId);
        }
      }
    }
  }

  function likePost(boardId, postId) {
    const board = boards.find(board => board.id === boardId);
    if (board) {
      const post = board.posts.find(post => post.id === postId);
      if (post) {
        post.likes++;
        renderPosts(boardId);
      }
    }
  }

  function toggleBookmark(boardId, postId) {
    const board = boards.find(board => board.id === boardId);
    if (board) {
      const post = board.posts.find(post => post.id === postId);
      if (post) {
        post.bookmarked = !post.bookmarked;
        renderPosts(boardId);
      }
    }
  }

  function searchBoards() {
    const searchQuery = prompt('Enter board title to search');
    if (searchQuery) {
      const filteredBoards = boards.filter(board =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      renderBoards(filteredBoards);
    }
  }

  function searchPosts(boardId) {
    const searchQuery = prompt('Enter post title to search');
    if (searchQuery) {
      const board = boards.find(board => board.id === boardId);
      if (board) {
        const filteredPosts = board.posts.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        renderPosts(boardId, filteredPosts);
      }
    }
  }

  function openModal(boardId, postId) {
const board = boards.find(board => board.id === boardId);
if (board) {
  const post = board.posts.find(post => post.id === postId);
  if (post) {
    const modalTitle = document.getElementById('modalTitle');
    const modalPosts = document.getElementById('modalPosts');
    modalTitle.textContent = post.title;
    modalPosts.innerHTML = `
      <div class="post-title">${post.title}</div>
      <div class="post-content">${post.content}</div>
      ${postId === 1 ? '<div class="post-image"><img class="img" src="https://www.toddleapp.com/wp-content/uploads/2022/05/Screens-3-scaled.webp" alt="Post Image"></div>' : ''}
      <button class="like-button" onclick="likePost(${boardId}, ${postId})">Like</button>
      <button onclick="updatePost(${boardId}, ${postId})">Update</button>
      <div class="bookmark-icon">${post.bookmarked ? '🔖' : ''}</div>
    `;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  }
}
}



  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }

  function renderBoards(filteredBoards) {
    const boardContainer = document.getElementById('boardContainer');
    boardContainer.innerHTML = '';

    const boardsToRender = filteredBoards || boards;

    boardsToRender.forEach(board => {
      const boardElement = document.createElement('div');
      boardElement.classList.add('board');
      boardElement.innerHTML = `
        <div class="board-title">${board.title}</div>
        <button onclick="createPost(${board.id})">Create Post</button>
        <button onclick="deleteBoard(${board.id})">Delete Board</button>
        <button onclick="searchPosts(${board.id})">Search Posts</button>
      `;

      const postContainer = document.createElement('div');
      postContainer.classList.add('post-container');
      board.posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <div class="post-title">${post.title}</div>
          <div class="post-content">${post.content}</div>
          <div>Likes: ${post.likes}</div>
          <div class="bookmark-icon">${post.bookmarked ? '🔖' : ''}</div>
        `;
        postElement.addEventListener('click', () => openModal(board.id, post.id));
        postContainer.appendChild(postElement);
      });

      boardElement.appendChild(postContainer);
      boardContainer.appendChild(boardElement);
    });
  }

  function updatePost(boardId, postId) {
    const board = boards.find(board => board.id === boardId);
    if (board) {
      const post = board.posts.find(post => post.id === postId);
      if (post) {
        const updatedTitle = prompt('Enter updated post title', post.title);
        const updatedContent = prompt('Enter updated post content', post.content);
        if (updatedTitle && updatedContent) {
          post.title = updatedTitle;
          post.content = updatedContent;
          renderPosts(boardId);
          closeModal();
        }
      }
    }
  }

  function renderPosts(boardId, filteredPosts) {
    const board = boards.find(board => board.id === boardId);
    if (board) {
      const postContainer = document.querySelector(`#boardContainer .board:nth-child(${boardId}) .post-container`);
      postContainer.innerHTML = '';

      const postsToRender = filteredPosts || board.posts;

      postsToRender.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        //postElement.draggable = true; // Added draggable attribute
        postElement.dataset.postId = post.id; // Added dataset attribute
        postElement.dataset.boardId = boardId; // Added dataset attribute
        postElement.innerHTML = `
          <div class="post-title">${post.title}</div>
          <div class="post-content">${post.content}</div>
          <div>Likes: ${post.likes}</div>
          <div class="bookmark-icon">${post.bookmarked ? '🔖' : ''}</div>
        `;

        postElement.addEventListener('click', () => openModal(boardId, post.id));
        postContainer.appendChild(postElement);

        
      });
    }
  }

 

  renderBoards();
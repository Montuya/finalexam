'use client';

import React, { useEffect, useState } from 'react';
import { Comment, User, BlogPost } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export default function CommentPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPost, setSelectedPost] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);

    fetch('/api/blog')
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser || !selectedPost || !body.trim()) {
      alert('Please complete all fields');
      return;
    }

    const newComment: Comment = {
      id: uuidv4(),
      postId: selectedPost,
      userId: selectedUser,
      body,
      createdAt: new Date(),
    };

    setComments([...comments, newComment]);
    setBody('');
    alert('Comment added!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        {/* Container for user and post selectors side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <label style={{ flex: 1 }}>
            Select User:
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{ display: 'block', marginTop: '8px', width: '100%' }}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          <label style={{ flex: 1 }}>
            Select Post:
            <select
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              style={{ display: 'block', marginTop: '8px', width: '100%' }}
            >
              <option value="">-- Select Post --</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>{post.title}</option>
              ))}
            </select>
          </label>
        </div>

        <label style={{ display: 'block', marginTop: '20px' }}>
          Comment:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ display: 'block', width: '100%', height: '80px', marginTop: '8px' }}
          />
        </label>

        <button type="submit" style={{ marginTop: '15px' }}>Submit Comment</button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h2>All Comments</h2>
      <ul>
  {comments.map((comment) => {
    const user = users.find(u => String(u.id) === String(comment.userId));
    const post = posts.find(p => String(p.id) === String(comment.postId));

    if (!user || !post) {
      console.log('Missing user or post for comment:', comment);
      return null;
    }

    return (
      <li key={comment.id} style={{ marginBottom: '15px' }}>
        <strong>{user.name}</strong> commented on <strong>{post.title}</strong><br />
        <em>{comment.body}</em><br />
        <small>{comment.createdAt.toLocaleString()}</small>
      </li>
    );
  })}
</ul>

    </div>
  );
}

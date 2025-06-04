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
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>
          Select User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            style={{ display: 'block', margin: '10px 0', width: '100%' }}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>

        <label>
          Select Post:
          <select
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value)}
            style={{ display: 'block', margin: '10px 0', width: '100%' }}
          >
            <option value="">-- Select Post --</option>
            {posts.map((post) => (
              <option key={post.id} value={post.id}>{post.title}</option>
            ))}
          </select>
        </label>

        <label>
          Comment:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ display: 'block', width: '100%', height: '80px', marginTop: '10px' }}
          />
        </label>

        <button type="submit" style={{ marginTop: '15px' }}>Submit Comment</button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h2>All Comments</h2>
      <ul>
        {comments.map((comment) => {
          const user = users.find((u) => u.id === comment.userId);
          const post = posts.find((p) => p.id === comment.postId);
          return (
            <li key={comment.id} style={{ marginBottom: '15px' }}>
              <strong>{user?.name || 'Unknown User'}</strong> commented on <strong>{post?.title || 'Unknown Post'}</strong><br />
              <em>{comment.body}</em><br />
              <small>{comment.createdAt.toLocaleString()}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

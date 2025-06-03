// app/components/BlogPostForm.tsx
'use client';

import React from 'react';
import { BlogPost } from '../types/blogPost';
import { User } from '../types/user';

interface BlogPostFormProps {
  post: Omit<BlogPost, 'id' | 'date'>;
  setPost: React.Dispatch<React.SetStateAction<Omit<BlogPost, 'id' | 'date'>>>;
  users: User[];
  errors: { [key: string]: string };
  onSubmit: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, setPost, users, errors, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const authorId = parseInt(e.target.value, 10);
    setPost(prevPost => ({ ...prevPost, authorId }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={post.content} onChange={handleChange} />
        {errors.content && <p className="error">{errors.content}</p>}
      </div>
      <div>
        <label htmlFor="authorId">Author:</label>
        <select id="authorId" name="authorId" value={post.authorId} onChange={handleAuthorChange}>
          <option value={0}>Select Author</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {errors.authorId && <p className="error">{errors.authorId}</p>}
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default BlogPostForm;
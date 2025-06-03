'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '../../types/blogPost';
import BlogPostForm from '../../components/BlogPostForm';
import { User } from '../../types/user';

const BlogAddPage: React.FC = () => {
  const [post, setPost] = useState<Omit<BlogPost, 'id' | 'date'>>({
    title: '',
    content: '',
    authorId: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!post.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (post.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
      isValid = false;
    }

    if (!post.authorId) {
      newErrors.authorId = 'Author is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddPost = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...post, date: new Date().toISOString() }),
        });

        if (response.ok) {
          router.push('/blog');
        } else {
          console.error('Failed to add post');
        }
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f9fafb',
      minHeight: 'calc(100vh - 80px)', // Adjusted for potential header/footer
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Center vertically as well
      fontFamily: 'sans-serif', // Cleaner font
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 0.75rem 2rem -0.5rem rgba(0, 0, 0, 0.2)', // More pronounced shadow
        width: '100%',
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px', // Increased spacing
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#2d3748',
          textAlign: 'center',
          marginBottom: '0.5em', // Reduced bottom margin
        }}>
          Create New Blog Post
        </h1>
        <BlogPostForm
          post={post}
          setPost={setPost}
          users={users}
          errors={errors}
          onSubmit={handleAddPost}
        />
      </div>
    </div>
  );
};

export default BlogAddPage;
// app/blog/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { BlogPost } from '../../types/blogPost';
import { User } from '../../types/user';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter

interface BlogParams {
  params: { id?: string };
}

const BlogPostDetailPage: React.FC<BlogParams> = ({ params }) => { // Receive params
  const [post, setPost] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = params; // Access id from params
  const router = useRouter(); // Use useRouter for navigation

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postsResponse = await fetch('/api/blog');
          if (!postsResponse.ok) {
            throw new Error('Failed to fetch posts');
          }
          const postsData: BlogPost[] = await postsResponse.json();
          const foundPost = postsData.find(p => p.id === Number(id));

          if (foundPost) {
            setPost(foundPost);

            const usersResponse = await fetch('/api/users');
            if (!usersResponse.ok) {
              throw new Error('Failed to fetch users');
            }
            const usersData: User[] = await usersResponse.json();
            const foundAuthor = usersData.find(u => u.id === foundPost.authorId);
            setAuthor(foundAuthor || null);
          } else {
            setError('Post not found');
            router.push('/blog'); // Redirect if post not found
          }
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id, router]); // Add router to dependencies

  if (loading) {
    return <div>Loading blog post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Author: {author ? author.name : 'Unknown'}</p>
      <p>Date: {new Date(post.date).toLocaleDateString()}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPostDetailPage;
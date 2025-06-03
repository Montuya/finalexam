// app/components/BlogPostCard.tsx
import React from 'react';
import { BlogPost } from '../types/blogPost';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <Link href={`/blog/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>Author: {post.authorName || 'Unknown'}</p>
      <p>Date: {new Date(post.date).toLocaleDateString()}</p>
      {post.thumbnail && <img src={post.thumbnail} alt="Thumbnail" style={{ maxWidth: '100%' }} />}
      <p>{post.content.substring(0, 100)}...</p> {/* Show a snippet */}
    </div>
  );
};

export default BlogPostCard;
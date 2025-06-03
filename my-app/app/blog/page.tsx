// app/blog/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types/blogPost';
import Link from 'next/link';
import BlogPostCard from '../components/BlogPostCard';
import { User } from '../types/user';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/users')
        ]);

        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        if (!usersResponse.ok) throw new Error('Failed to fetch users');

        const [postsData, usersData] = await Promise.all([
          postsResponse.json(),
          usersResponse.json()
        ]);

        const enrichedPosts = postsData.map(post => {
          const author = usersData.find(user => user.id === post.authorId);
          return { 
            ...post, 
            authorName: author ? author.name : 'Unknown',
            authorAvatar: author?.image || '/default-avatar.png'
          };
        });

        setPosts(enrichedPosts);
        setUsers(usersData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <p style={{
          fontSize: '18px',
          color: '#555',
          fontWeight: '500'
        }}>Loading Blog Posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '500px',
          border: '1px solid #f5c6cb'
        }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ marginRight: '10px' }}>⚠️</span>
            Loading Error
          </h2>
          <p style={{ marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '30px 20px',
      minHeight: '80vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '10px'
          }}>Blog Posts</h1>
          <p style={{
            color: '#7f8c8d',
            fontSize: '16px'
          }}>
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} available
          </p>
        </div>
        
        <Link
          href="/blog/add"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.3s',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#95a5a6" 
            style={{ marginBottom: '20px' }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
          </svg>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#34495e',
            marginBottom: '10px'
          }}>No Blog Posts Yet</h3>
          <p style={{
            color: '#7f8c8d',
            marginBottom: '20px'
          }}>Be the first to share your thoughts!</p>
          <Link
            href="/blog/add"
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '25px'
        }}>
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
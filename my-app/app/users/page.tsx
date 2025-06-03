// app/users/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../types/user';
import Link from 'next/link';
import UserCard from '../components/UserCard';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            width: '3rem',
            height: '3rem',
            border: '4px solid rgba(0, 0, 0, 0.1)',
            borderLeftColor: '#007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }}></div>
          <p style={{ fontSize: '1.125rem', color: '#6c757d' }}>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '1.5rem',
          maxWidth: '28rem',
          margin: '0 auto',
          backgroundColor: '#f8d7da',
          borderRadius: '0.5rem',
          border: '1px solid #f5c6cb'
        }}>
          <div style={{
            fontSize: '3rem',
            color: '#dc3545',
            marginBottom: '1rem'
          }}>⚠️</div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#721c24',
            marginBottom: '0.5rem'
          }}>Error Loading Users</h2>
          <p style={{ color: '#721c24', marginBottom: '1rem' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '3rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#212529',
              marginBottom: '0.5rem'
            }}>User Directory</h1>
            <p style={{ color: '#6c757d' }}>
              {users.length} {users.length === 1 ? 'user' : 'users'} found
            </p>
          </div>
          <Link
            href="/users/add"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              marginTop: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0069d9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            <svg 
              style={{
                width: '1.25rem',
                height: '1.25rem',
                marginRight: '0.5rem',
                fill: 'currentColor'
              }} 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New User
          </Link>
        </div>

        {users.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 0',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <svg 
              style={{
                width: '3rem',
                height: '3rem',
                color: '#adb5bd',
                margin: '0 auto'
              }} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 style={{
              marginTop: '0.5rem',
              fontSize: '1.25rem',
              fontWeight: '500',
              color: '#495057'
            }}>No users found</h3>
            <p style={{ color: '#6c757d', marginTop: '0.25rem' }}>
              Get started by adding a new user.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UsersPage;
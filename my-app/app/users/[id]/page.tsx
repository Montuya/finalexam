'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { useParams, useRouter } from 'next/navigation';

interface UserParams {
  params: { id?: string };
}

const UserDetailPage: React.FC<UserParams> = ({ params }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await fetch('/api/users');
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          const data: User[] = await response.json();
          const foundUser = data.find(u => u.id === Number(id));

          if (foundUser) {
            setUser(foundUser);
          } else {
            setError('User not found');
            router.push('/users'); // Redirect to users page
          }
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [id, router]);

  if (loading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: 'calc(100vh - 60px)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>User Details</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Name: {user.name}</p>
        <p style={{ marginBottom: '8px' }}>Email: {user.email}</p>
        {user.age && <p style={{ marginBottom: '8px' }}>Age: {user.age}</p>}
      </div>
    </div>
  );
};

export default UserDetailPage;
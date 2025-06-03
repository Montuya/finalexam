// app/components/UserCard.tsx
import React from 'react';
import { User } from '../types/user';
import Link from 'next/link';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
      <Link href={`/users/${user.id}`}>
        <h3>{user.name}</h3>
      </Link>
      <p>Email: {user.email}</p>
      {user.age && <p>Age: {user.age}</p>}
    </div>
  );
};

export default UserCard;
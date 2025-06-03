// app/components/UserForm.tsx
'use client';

import React from 'react';
import { User } from '../types/user';

interface UserFormProps {
  user: Omit<User, 'id'> | User; // Allow with or without ID
  setUser: React.Dispatch<React.SetStateAction<Omit<User, 'id'> | User>>;
  errors: { [key: string]: string };
  onSubmit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, setUser, errors, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="age">Age (optional):</label>
        <input type="number" id="age" name="age" value={user.age ?? ''} onChange={handleChange} />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
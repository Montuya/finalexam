// app/users/add/page.tsx
'use client'; // Client Component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../types/user';
import UserForm from '../../components/UserForm';

const UserAddPage: React.FC = () => {
  const [newUser, setUser] = useState<Omit<User, 'id'>>({ name: '', email: '', age: undefined }); // Exclude 'id'
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(newUser.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddUser = async () => {
    if (validateForm()) {
      // Optimistic UI update (optional, for faster feedback)
      // In a real app, you'd likely post to an API
      console.log('Adding user:', newUser);

      // Simulate API call (replace with your actual API call)
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          router.push('/users'); // Redirect to user list
        } else {
          console.error('Failed to add user');
          // Handle error (e.g., show an error message to the user)
        }
      } catch (error) {
        console.error('Error adding user:', error);
        // Handle error
      }
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <UserForm user={newUser} setUser={setUser} errors={errors} onSubmit={handleAddUser} />
    </div>
  );
};

export default UserAddPage;
// app/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', gap: '20px' }}>
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/category">Category</Link>
    </nav>
  );
};

export default Navbar;
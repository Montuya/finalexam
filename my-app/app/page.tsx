// app/page.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Nexus | Home',
  description: 'Discover the power of modern web applications',
};

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
      color: 'white',
    }}>
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        paddingTop: '96px',
        paddingBottom: '96px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: 'linear-gradient(to right, #22d3ee, #10b981)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
            Elevate Your Digital Experience
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#d1d5db',
            marginBottom: '48px',
            lineHeight: '1.75',
          }}>
            Nexus is your gateway to innovative solutions. We combine cutting-edge technology with intuitive design.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}>
            <Link
              href="/users"
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: '500',
                backgroundColor: '#059669',
                color: 'white',
                textDecoration: 'none',
                transition: 'background-color 0.3s',
              }}
            >
              USERS
            </Link>
            <Link
              href="/blog"
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: '500',
                backgroundColor: 'transparent',
                border: '2px solid #22d3ee',
                color: '#22d3ee',
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
            >
              BLOG
            </Link>
          </div>
        </div>

        <div style={{
          marginTop: '96px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          width: '100%',
        }}>
          <div style={{
            backgroundColor: 'rgba(31, 41, 55, 0.5)',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #374151',
            transition: 'border-color 0.3s',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#22d3ee' }}>Performance</h3>
            <p style={{ color: '#9ca3af' }}>Lightning-fast responses with optimized architecture.</p>
          </div>
          {/* Add other cards similarly */}
        </div>
      </main>
    </div>
  );
}
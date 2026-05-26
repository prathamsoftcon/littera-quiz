import React from 'react';
import Topbar from '../components/Topbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Topbar />
      <main style={{ padding: 20 }}>
        {children}
      </main>
    </div>
  );
}

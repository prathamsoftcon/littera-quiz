import React from 'react';
import Topbar from '../components/Topbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Topbar />
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}

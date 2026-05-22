import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Topbar() {
  const loc = useLocation();
  return (
    <header className="topbar">
      <div>
        <h1>Littera Quiz Platform</h1>
      </div>
      <nav className="role-tabs" aria-label="Wireframe sections">
        <Link to="/">Onboarding</Link>
        <Link to="/question-bank/create">Question Bank</Link>
        <Link to="/student">Student</Link>
        <Link to="/teacher">Teacher</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/mobile">Mobile</Link>
      </nav>
    </header>
  );
}

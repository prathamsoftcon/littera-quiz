import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles = [], currentRole }) {
  if (!allowedRoles || allowedRoles.length === 0) return children;
  if (allowedRoles.includes(currentRole)) return children;
  return <Navigate to="/" replace />;
}

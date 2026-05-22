import React from 'react';

export default function RoleRouting({ detectedRole, profileComplete, onSelect }) {
  const roles = ['student', 'teacher', 'admin'];
  return (
    <div>
      <div className="route-card">
        <span>Role detected</span>
        <strong>{detectedRole || 'Student / Teacher / Admin'}</strong>
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Choose role</label>
        <div className="segmented">
          {roles.map((r) => (
            <button key={r} onClick={() => onSelect && onSelect(r)}>{r.charAt(0).toUpperCase() + r.slice(1)}</button>
          ))}
        </div>
      </div>
      <div className="status-strip" style={{ marginTop: 8 }}>Next screen is selected by role and profile status</div>
    </div>
  );
}

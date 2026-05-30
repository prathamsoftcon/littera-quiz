import React from 'react';

export default function AdminSidebar({ title, items, activeModule, setActiveModule, pendingCount }) {
  return (
    <aside className="admin-sidebar" aria-label="Admin modules">
      <h3>{title}</h3>
      <div className="admin-sidebar-list">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`admin-nav-btn ${activeModule === item.key ? 'active' : ''}`}
            onClick={() => setActiveModule(item.key)}
          >
            <span>{item.label}</span>
            {item.key === 'approval' ? <b>{pendingCount}</b> : null}
          </button>
        ))}
      </div>
    </aside>
  );
}

import React from 'react';

export default function TeacherSidebar({ title, items, activeModule, setActiveModule }) {
  return (
    <aside className="teacher-sidebar" aria-label="Teacher modules">
      <h3>{title}</h3>
      <div className="teacher-sidebar-list">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`teacher-nav-btn ${activeModule === item.key ? 'active' : ''}`}
            onClick={() => setActiveModule(item.key)}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

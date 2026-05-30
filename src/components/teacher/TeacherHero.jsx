import React from 'react';

export default function TeacherHero({ eyebrow, title, actions = [] }) {
  return (
    <div className="teacher-hero">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {actions.length ? (
        <div className="teacher-hero-actions">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={`teacher-btn ${action.variant || ''}`.trim()}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

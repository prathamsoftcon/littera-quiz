import React from 'react';

export default function TeacherStatCard({ label, value, helper, tone = 'teal', icon: Icon }) {
  return (
    <article className={`teacher-stat-card ${tone}`}>
      {Icon ? <Icon className="teacher-stat-icon" /> : null}
      <div className="teacher-stat-body">
        <span className="teacher-stat-label">{label}</span>
        <strong className="teacher-stat-value">{value}</strong>
        {helper ? <small className="teacher-stat-helper">{helper}</small> : null}
      </div>
    </article>
  );
}

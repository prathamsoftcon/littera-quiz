import React from 'react';

export default function AnalyticsPanel({ t, analytics }) {
  return (
    <article className="panel admin-panel active-panel">
      <div className="panel-title">{t('adminAnalyticsSnapshot')}</div>

      <div className="analytics-set">
        <div>
          <label>{t('adminWeeklyActiveUsers')}</label>
          <div className="sparkline">
            {analytics.weeklyUsers.map((value, i) => (
              <span key={`wau-${i}`} style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>

        <div>
          <label>{t('adminQuizCompletionRate')}</label>
          <div className="sparkline success">
            {analytics.completionRate.map((value, i) => (
              <span key={`cr-${i}`} style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>

        <div>
          <label>{t('adminTeacherParticipation')}</label>
          <div className="sparkline warning">
            {analytics.teacherParticipation.map((value, i) => (
              <span key={`tp-${i}`} style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

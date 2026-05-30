import React from 'react';

export default function AdminLiveGrid({ stats, pendingCount, t }) {
  return (
    <div className="admin-live-grid">
      <article className="admin-live-card players">
        <span>{t('adminLivePlayers')}</span>
        <strong>{stats.players.toLocaleString()}</strong>
        <small>{t('adminRealtimeCompetitionSessions')}</small>
      </article>
      <article className="admin-live-card slots">
        <span>{t('adminSlotsActive')}</span>
        <strong>{stats.slots}</strong>
        <small>{t('adminConcurrentQuizWindows')}</small>
      </article>
      <article className="admin-live-card violations">
        <span>{t('adminViolationsLogged')}</span>
        <strong>{stats.violations}</strong>
        <small>{t('adminCameraChecks')}</small>
      </article>
      <article className="admin-live-card queue">
        <span>{t('adminPendingApprovals')}</span>
        <strong>{pendingCount}</strong>
        <small>{t('adminQuestionBankModeration')}</small>
      </article>
    </div>
  );
}

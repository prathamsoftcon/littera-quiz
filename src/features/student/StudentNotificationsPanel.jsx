import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

export default function StudentNotificationsPanel({ notifications, progress, onViewLeaderboard }) {
  const { t } = useTranslation();
  return (
    <article className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="rounded-[28px] bg-gradient-to-br from-sky-400 via-sky-600 to-indigo-500 p-6 text-white shadow-[0_18px_40px_rgba(14,165,233,0.08)]">
        <p className="text-sm uppercase tracking-[0.18em] text-white/90">{t('notifications.title')}</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{t('notifications.highlightTitle')}</h3>
        <p className="mt-4 text-sm leading-6 text-white/90">{t('notifications.highlightDesc')}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-white/80">{t('notifications.avgSpeedLabel')}</p>
            <p className="mt-2 text-xl font-semibold text-white">{progress.speed}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-white/80">{t('notifications.timeSavedLabel')}</p>
            <p className="mt-2 text-xl font-semibold text-white">{progress.timeSaved}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('notifications.title')}</p>
        <ul className="mt-4 space-y-3">
          {notifications.map((item) => (
            <li key={item.title} className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm">
              <span className="font-semibold text-slate-950">{item.title}</span>
              <p className="mt-1 text-slate-600">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => onViewLeaderboard && onViewLeaderboard()} className="mt-6 w-full rounded-3xl bg-sky-800 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
        {t('notifications.viewLeaderboard')}
      </button>
    </article>
  );
}

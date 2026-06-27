import React from 'react';
import { FaBell, FaChartLine, FaClock, FaTrophy } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';

export default function StudentNotificationsPanel({ notifications, progress, onViewLeaderboard }) {
  const { t } = useTranslation();

  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <FaChartLine className="text-sky-700" aria-hidden="true" />
          {t('notifications.title')}
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-slate-950">{t('notifications.highlightTitle')}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{t('notifications.highlightDesc')}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t('notifications.avgSpeedLabel')}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{progress.speed}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t('notifications.timeSavedLabel')}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">{progress.timeSaved}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewLeaderboard && onViewLeaderboard()}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <FaTrophy aria-hidden="true" />
          {t('notifications.viewLeaderboard')}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <FaBell className="text-amber-600" aria-hidden="true" />
            Activity
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{notifications.length} updates</span>
        </div>

        <ul className="mt-4 space-y-3">
          {notifications.map((item, index) => (
            <li key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sky-700">
                  {index === 0 ? <FaClock aria-hidden="true" /> : <FaTrophy aria-hidden="true" />}
                </span>
                <div>
                  <span className="font-semibold text-slate-950">{item.title}</span>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

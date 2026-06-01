import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

export default function StudentOverviewPanel({ metrics, upcomingSlot, rewardProgress, onJoin, defaultMode, defaultSettings }) {
  const { t } = useTranslation();
  return (
    <article aria-label="Overview" role="region" className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">{t('sidebar.overview')}</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-slate-950">{t('overview.title')}</h2>
          <button
            onClick={() => onJoin && onJoin({ mode: defaultMode, settings: defaultSettings })}
            aria-label={t('overview.join')}
            className="inline-flex items-center justify-center rounded-full bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {t('overview.join')}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`overflow-hidden rounded-3xl p-5 shadow-md ${metric.accent} flex flex-col justify-between`}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">{metric.label}</p>
            </div>
            <p className="mt-4 text-3xl font-extrabold text-slate-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Upcoming slot</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{upcomingSlot.title}</p>
            </div>
            <span className="rounded-full bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-700">Live</span>
          </div>
          <div className="mt-5 rounded-3xl bg-gradient-to-r from-sky-600/10 via-slate-50 to-slate-50 p-4">
            <p className="text-sm text-slate-500">{upcomingSlot.note}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Current reward</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{rewardProgress.name}</p>
            </div>
            <div className="rounded-3xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-700">
              {rewardProgress.percent}% complete
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${rewardProgress.percent}%` }} />
          </div>
        </div>
      </div>
    </article>
  );
}

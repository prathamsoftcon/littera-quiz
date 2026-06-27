import React from 'react';
import { FaArrowRight, FaClock, FaSignal } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';

export default function StudentOverviewPanel({ metrics, upcomingSlot, rewardProgress, onJoin, defaultMode, defaultSettings }) {
  const { t } = useTranslation();

  return (
    <section aria-label="Overview" className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{t('sidebar.overview')}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{t('overview.title')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Your next quiz, match status, reward progress, and performance signals are ready in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onJoin && onJoin({ mode: defaultMode, settings: defaultSettings })}
            aria-label={t('overview.join')}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {t('overview.join')}
            <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className={`rounded-2xl border p-5 shadow-sm ${metric.accent}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">{metric.label}</p>
                {Icon ? <Icon className="text-lg" aria-hidden="true" /> : null}
              </div>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{metric.helper}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <FaClock className="text-sky-700" aria-hidden="true" />
                Upcoming slot
              </div>
              <p className="mt-3 text-xl font-semibold text-slate-950">{upcomingSlot.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{upcomingSlot.note}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Live</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {['Queue synced', 'Questions cached', 'Timer ready'].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <FaSignal className="text-emerald-700" aria-hidden="true" />
                Current reward
              </div>
              <p className="mt-3 text-xl font-semibold text-slate-950">{rewardProgress.name}</p>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {rewardProgress.percent}%
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${rewardProgress.percent}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-600">Complete one more timed round to lock the weekly badge progress.</p>
        </div>
      </div>
    </section>
  );
}

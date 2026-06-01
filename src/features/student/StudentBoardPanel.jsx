import React from 'react';
import { useTranslation } from '../../context/TranslationContext';

const boardCells = Array.from({ length: 25 }).map((_, index) => {
  const number = 100 - index * 4;
  return {
    number,
    type: [6, 18].includes(index) ? 'snake' : [11].includes(index) ? 'ladder' : null,
  };
});

export default function StudentBoardPanel({ variant = '1v1', settings = {}, diceRoll, onRollDice }) {
  const { t } = useTranslation();
  const title =
    variant === 'Group'
      ? t('board.variant.group')
      : variant === 'Tournament'
      ? t('board.variant.tournament')
      : t('board.variant.1v1');
  const { preloadedCount = 12, lowNetwork = false, speedBonus = 'Small' } = settings;

  return (
    <article className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{t('board.title')}</p>
          <h2 className="mt-2 text-2xl font-semibold text-sky-700">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">{t('board.dice')}: {diceRoll}</div>
          <button
            type="button"
            onClick={() => onRollDice && onRollDice()}
            className="rounded-full bg-sky-800 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {t('board.roll')}
          </button>
        </div>
      </div>

      <div className="mb-6">
        {variant === 'Group' && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <div className="font-semibold">{t('board.group.title')}</div>
            <div className="mt-2">{t('board.group.desc')}</div>
            <div className="mt-3 text-sm text-slate-500">{t('board.preloaded', { count: preloadedCount })} • {lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled')} • {t('board.speedBonus', { speedBonus })}</div>
          </div>
        )}
        {variant === 'Tournament' && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <div className="font-semibold">{t('board.tournament.title')}</div>
            <div className="mt-2">{t('board.tournament.desc')}</div>
            <div className="mt-3 text-sm text-slate-500">{t('board.preloaded', { count: preloadedCount })} • {lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled')} • {t('board.speedBonus', { speedBonus })}</div>
          </div>
        )}
        {variant === '1v1' && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <div className="font-semibold">{t('board.1v1.title')}</div>
            <div className="mt-2">{t('board.1v1.desc')}</div>
            <div className="mt-3 text-sm text-slate-500">{t('board.preloaded', { count: preloadedCount })} • {lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled')} • {t('board.speedBonus', { speedBonus })}</div>
          </div>
        )}
      </div>

      <div className="grid gap-2 rounded-[28px] border border-slate-200 bg-slate-950/95 p-4 text-slate-100 grid-cols-2 sm:grid-cols-5">
        {boardCells.map((cell) => (
          <div
            key={cell.number}
            className={`relative flex min-h-[64px] sm:min-h-[88px] flex-col items-center justify-between rounded-3xl border border-slate-800/70 bg-slate-900/95 p-2 text-xs sm:text-sm ${
              cell.type === 'snake' ? 'bg-rose-500/10' : cell.type === 'ladder' ? 'bg-emerald-500/10' : ''
            }`}
          >
            <span className="font-semibold text-slate-200">{cell.number}</span>
            {cell.type ? (
              <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${
                cell.type === 'snake' ? 'bg-rose-500/15 text-rose-300' : 'bg-emerald-500/15 text-emerald-300'
              }`}>
                {cell.type}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('board.objective')}</p>
        <p className="mt-3 leading-6">
          {variant === 'Tournament' ? (
            <>{t('board.objective.tournament', { speedBonus })}</>
          ) : variant === 'Group' ? (
            <>{t('board.objective.group', { lowNetwork: lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled') })}</>
          ) : (
            <>{t('board.objective.1v1', { speedBonus })}</>
          )}
        </p>
        <div className="mt-4 text-sm text-slate-500">{t('board.preloaded', { count: preloadedCount })}</div>
      </div>
    </article>
  );
}

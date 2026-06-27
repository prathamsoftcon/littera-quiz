import React from 'react';
import { FaBolt, FaDice, FaNetworkWired, FaUsers } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';

const boardCells = Array.from({ length: 25 }).map((_, index) => {
  const number = 100 - index * 4;
  return {
    number,
    status: index < 6 ? 'complete' : index < 13 ? 'active' : 'locked',
    type: [6, 18].includes(index) ? 'challenge' : [11].includes(index) ? 'boost' : null,
  };
});

export default function GroupGameBoard({ variant = 'Group', settings = {}, diceRoll = '-', onRollDice }) {
  const { t } = useTranslation();
  const { preloadedCount = 12, lowNetwork = false, speedBonus = 'Small' } = settings;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t('board.title')}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{t('board.variant.group')}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t('board.group.desc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{t('board.dice')}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-950">{diceRoll}</p>
          </div>
          <button
            type="button"
            onClick={() => onRollDice && onRollDice()}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <FaDice aria-hidden="true" />
            {t('board.roll')}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-800"><FaUsers aria-hidden="true" /> Team progress</div>
          <p className="mt-2 text-2xl font-semibold text-slate-950">64%</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><FaNetworkWired aria-hidden="true" /> Network</div>
          <p className="mt-2 text-sm font-semibold text-slate-950">{lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled')}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800"><FaBolt aria-hidden="true" /> Bonus</div>
          <p className="mt-2 text-sm font-semibold text-slate-950">{t('board.speedBonus', { speedBonus })}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 grid-cols-5">
        {boardCells.map((cell) => (
          <div
            key={cell.number}
            className={`relative flex min-h-[58px] flex-col justify-between rounded-lg border p-2 text-xs ${
              cell.status === 'complete'
                ? 'border-emerald-200 bg-emerald-50'
                : cell.status === 'active'
                ? 'border-sky-200 bg-white'
                : 'border-slate-200 bg-slate-100 text-slate-500'
            }`}
          >
            <span className="font-semibold">{cell.number}</span>
            {cell.type ? (
              <span className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${cell.type === 'boost' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {cell.type}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
        <p className="font-semibold text-slate-950">{t('board.objective')}</p>
        <p className="mt-2">{t('board.objective.group', { lowNetwork: lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled') })}</p>
        <p className="mt-2 text-slate-500">{t('board.preloaded', { count: preloadedCount })}</p>
      </div>
    </section>
  );
}

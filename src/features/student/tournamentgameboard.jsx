import React from 'react';
import { FaBolt, FaDice, FaFlagCheckered, FaTrophy } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';

const rounds = [
  { name: 'Qualifier', status: 'Won', score: '420 pts' },
  { name: 'Quarterfinal', status: 'Live', score: 'Round 2' },
  { name: 'Semifinal', status: 'Locked', score: 'Pending' },
  { name: 'Final', status: 'Locked', score: 'Pending' },
];

export default function TournamentGameBoard({ variant = 'Tournament', settings = {}, diceRoll = '-', onRollDice }) {
  const { t } = useTranslation();
  const { preloadedCount = 12, lowNetwork = false, speedBonus = 'Small' } = settings;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t('board.title')}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{t('board.variant.tournament')}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t('board.tournament.desc')}</p>
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
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800"><FaTrophy aria-hidden="true" /> Current rank</div>
          <p className="mt-2 text-2xl font-semibold text-slate-950">#8</p>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-800"><FaFlagCheckered aria-hidden="true" /> Round timer</div>
          <p className="mt-2 text-2xl font-semibold text-slate-950">04:32</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><FaBolt aria-hidden="true" /> Bonus</div>
          <p className="mt-2 text-sm font-semibold text-slate-950">{t('board.speedBonus', { speedBonus })}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {rounds.map((round) => (
          <div
            key={round.name}
            className={`rounded-2xl border p-4 ${
              round.status === 'Won'
                ? 'border-emerald-200 bg-emerald-50'
                : round.status === 'Live'
                ? 'border-sky-300 bg-white shadow-sm'
                : 'border-slate-200 bg-slate-50 text-slate-500'
            }`}
          >
            <p className="text-sm font-semibold text-slate-950">{round.name}</p>
            <p className="mt-3 text-2xl font-semibold">{round.status}</p>
            <p className="mt-2 text-sm">{round.score}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
        <p className="font-semibold text-slate-950">{t('board.objective')}</p>
        <p className="mt-2">{t('board.objective.tournament', { speedBonus })}</p>
        <p className="mt-2 text-slate-500">
          {t('board.preloaded', { count: preloadedCount })} | {lowNetwork ? t('board.lowNetworkEnabled') : t('board.lowNetworkDisabled')}
        </p>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import OneVOneGameBoard from './1v1gameboard';
import GroupGameBoard from './groupegameboard';
import TournamentGameBoard from './tournamentgameboard';

export default function StudentLobbyPanel({ modes, queuePosition, notes, selectedMode, onModeSelect, onJoin }) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [localMode, setLocalMode] = useState(selectedMode);
  const [openNotes, setOpenNotes] = useState({});
  const [preloadedCount, setPreloadedCount] = useState(12);
  const [lowNetwork, setLowNetwork] = useState(true);
  const [speedBonus, setSpeedBonus] = useState('Small');
  const [joined, setJoined] = useState(false);
  const [joinedMode, setJoinedMode] = useState(null);
  const [joinedSettings, setJoinedSettings] = useState({});
  const [joinedKey, setJoinedKey] = useState(null);

  useEffect(() => setLocalMode(selectedMode), [selectedMode]);

  function handleConfirmJoin() {
    setConfirmOpen(false);
    const settings = { preloadedCount, lowNetwork, speedBonus };
    setJoined(true);
    setJoinedMode(localMode);
    setJoinedSettings(settings);
    const normalize = (m) => (typeof m === 'string' ? m.toLowerCase().replace(/\s+/g, '') : m);
    const key = normalize(localMode);
    setJoinedKey(key);
    console.log('[Lobby] handleConfirmJoin:', { localMode, key, settings });
    onJoin && onJoin({ mode: localMode, settings });
  }

  function toggleNote(n) {
    setOpenNotes((s) => ({ ...s, [n]: !s[n] }));
  }

  return (
    <>
    <article className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{t('lobby.title')}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{t('lobby.queueStatus')}</h2>
        </div>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">{queuePosition.players} {t('lobby.playersWaiting')}</span>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap gap-3">
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setLocalMode(mode);
                onModeSelect && onModeSelect(mode);
              }}
              className={`w-full sm:w-auto text-center rounded-2xl border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                localMode === mode
                  ? 'bg-sky-800 text-white border-sky-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

            <div className="mt-6 space-y-3 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{t('lobby.queuePosition')}</p>
          <p className="text-4xl font-semibold text-slate-950">#{queuePosition.position}</p>
          <p className="text-sm leading-6 text-slate-600">{queuePosition.note}</p>
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="w-full sm:w-auto rounded-full bg-sky-800 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {t('lobby.joinNow')}
            </button>
            <span className="text-sm text-slate-500">{t('lobby.modeLabel')}: {localMode || '—'}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
        {notes.map((noteEntry) => {
          // noteEntry can be a translation key string or an object { labelKey, type }
          const noteKey = typeof noteEntry === 'string' ? noteEntry : noteEntry.labelKey || noteEntry.key;
          const noteLabel = typeof noteEntry === 'string' ? t(noteEntry) : t(noteEntry.labelKey);
          const noteType = typeof noteEntry === 'string'
            ? (noteEntry.includes('preloaded') ? 'questions' : noteEntry.includes('network') ? 'network' : noteEntry.includes('speed') ? 'speed' : null)
            : noteEntry.type;

          return (
            <div key={noteKey} className={`${openNotes[noteKey] ? 'rounded-3xl bg-sky-50 border-l-4 border-sky-600 px-4 py-3 text-sm text-slate-700 shadow-sm' : 'rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <div>{noteLabel}</div>
                <button type="button" onClick={() => toggleNote(noteKey)} className="text-sm text-sky-700 font-semibold">{openNotes[noteKey] ? t('hide') : t('show')}</button>
              </div>
              {openNotes[noteKey] ? (
                <div className="mt-3">
                  {noteType === 'questions' && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-slate-600">{t('lobby.preloadedLabel')}</label>
                      <select value={preloadedCount} onChange={(e) => setPreloadedCount(Number(e.target.value))} className="rounded px-2 py-1 border">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                      </select>
                      <div className="text-sm text-slate-500">{t('lobby.itemsPreloaded', { count: preloadedCount })}</div>
                    </div>
                  )}
                  {noteType === 'network' && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-slate-600">{t('lobby.lowNetworkLabel')}</label>
                      <button type="button" onClick={() => setLowNetwork(!lowNetwork)} className={`rounded px-2 py-1 border ${lowNetwork ? 'bg-emerald-100' : ''}`}>
                        {lowNetwork ? t('lobby.enabled') : t('lobby.disabled')}
                      </button>
                      <div className="text-sm text-slate-500">{lowNetwork ? t('lobby.cachingEnabled') : t('lobby.standardMode')}</div>
                    </div>
                  )}
                  {noteType === 'speed' && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-slate-600">{t('lobby.bonusLabel')}</label>
                      <select value={speedBonus} onChange={(e) => setSpeedBonus(e.target.value)} className="rounded px-2 py-1 border">
                        <option>None</option>
                        <option>Small</option>
                        <option>Large</option>
                      </select>
                      <div className="text-sm text-slate-500">{t('lobby.current')}: {speedBonus}</div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold">{t('lobby.confirmTitle')}</h3>
            <p className="mt-3 text-sm text-slate-600">You're about to join a <strong>{localMode}</strong> match. Proceed to the {localMode} game board?</p>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setConfirmOpen(false)} className="rounded px-4 py-2 border">{t('lobby.confirmCancel')}</button>
              <button type="button" onClick={handleConfirmJoin} className="rounded px-4 py-2 bg-sky-600 text-white">{t('lobby.confirmConfirm')}</button>
            </div>
          </div>
        </div>
      ) : null}
    </article>

    {joined && joinedKey === '1v1' && (
      <div className="mt-6">
        {console.log('[Lobby] rendering 1v1 board, joinedMode=', joinedMode)}
        <OneVOneGameBoard variant="1v1" settings={joinedSettings} />
      </div>
    )}
    {joined && joinedKey === 'group' && (
      <div className="mt-6">
        {console.log('[Lobby] rendering Group board, joinedMode=', joinedMode)}
        <GroupGameBoard variant="Group" settings={joinedSettings} />
      </div>
    )}
    {joined && joinedKey === 'tournament' && (
      <div className="mt-6">
        {console.log('[Lobby] rendering Tournament board, joinedMode=', joinedMode)}
        <TournamentGameBoard variant="Tournament" settings={joinedSettings} />
      </div>
    )}
    </>
  );
}

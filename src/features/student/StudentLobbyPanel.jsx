import React, { useEffect, useState } from 'react';
import { FaBolt, FaCheckCircle, FaCloudDownloadAlt, FaNetworkWired, FaUsers } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';
import OneVOneGameBoard from './1v1gameboard';
import GroupGameBoard from './groupegameboard';
import TournamentGameBoard from './tournamentgameboard';

const noteMeta = {
  questions: { icon: FaCloudDownloadAlt, tone: 'text-sky-700 bg-sky-50 border-sky-200' },
  network: { icon: FaNetworkWired, tone: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  speed: { icon: FaBolt, tone: 'text-amber-700 bg-amber-50 border-amber-200' },
};

export default function StudentLobbyPanel({ modes, queuePosition, notes, selectedMode, onModeSelect, onJoin }) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [localMode, setLocalMode] = useState(selectedMode);
  const [openNotes, setOpenNotes] = useState({});
  const [preloadedCount, setPreloadedCount] = useState(12);
  const [lowNetwork, setLowNetwork] = useState(true);
  const [speedBonus, setSpeedBonus] = useState('Small');
  const [joined, setJoined] = useState(false);
  const [joinedKey, setJoinedKey] = useState(null);
  const [joinedSettings, setJoinedSettings] = useState({});

  useEffect(() => setLocalMode(selectedMode), [selectedMode]);

  function getNoteType(noteEntry) {
    if (typeof noteEntry !== 'string') return noteEntry.type;
    if (noteEntry.includes('preloaded')) return 'questions';
    if (noteEntry.includes('network')) return 'network';
    if (noteEntry.includes('speed')) return 'speed';
    return 'questions';
  }

  function handleConfirmJoin() {
    const settings = { preloadedCount, lowNetwork, speedBonus };
    const key = typeof localMode === 'string' ? localMode.toLowerCase().replace(/\s+/g, '') : localMode;
    setConfirmOpen(false);
    setJoined(true);
    setJoinedKey(key);
    setJoinedSettings(settings);
    onJoin && onJoin({ mode: localMode, settings });
  }

  function toggleNote(noteKey) {
    setOpenNotes((state) => ({ ...state, [noteKey]: !state[noteKey] }));
  }

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t('lobby.title')}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{t('lobby.queueStatus')}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{queuePosition.note}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FaUsers className="text-sky-700" aria-hidden="true" />
              {queuePosition.players} {t('lobby.playersWaiting')}
            </div>
            <p className="mt-1 text-2xl font-semibold text-slate-950">#{queuePosition.position}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">{t('lobby.modeLabel')}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setLocalMode(mode);
                    onModeSelect && onModeSelect(mode);
                  }}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    localMode === mode
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3">
              {notes.map((noteEntry) => {
                const noteKey = typeof noteEntry === 'string' ? noteEntry : noteEntry.labelKey || noteEntry.key;
                const noteLabel = typeof noteEntry === 'string' ? t(noteEntry) : t(noteEntry.labelKey);
                const noteType = getNoteType(noteEntry);
                const meta = noteMeta[noteType] || noteMeta.questions;
                const Icon = meta.icon;

                return (
                  <div key={noteKey} className={`rounded-xl border bg-white p-4 ${openNotes[noteKey] ? meta.tone : 'border-slate-200'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                          <Icon aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold text-slate-800">{noteLabel}</span>
                      </div>
                      <button type="button" onClick={() => toggleNote(noteKey)} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-sky-700 hover:bg-white">
                        {openNotes[noteKey] ? t('hide') : t('show')}
                      </button>
                    </div>

                    {openNotes[noteKey] ? (
                      <div className="mt-4">
                        {noteType === 'questions' && (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <label className="text-sm font-medium text-slate-600">{t('lobby.preloadedLabel')}</label>
                            <select value={preloadedCount} onChange={(e) => setPreloadedCount(Number(e.target.value))} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                              <option value={5}>5</option>
                              <option value={10}>10</option>
                              <option value={12}>12</option>
                              <option value={15}>15</option>
                            </select>
                            <span className="text-sm text-slate-500">{t('lobby.itemsPreloaded', { count: preloadedCount })}</span>
                          </div>
                        )}
                        {noteType === 'network' && (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <span className="text-sm font-medium text-slate-600">{t('lobby.lowNetworkLabel')}</span>
                            <button type="button" onClick={() => setLowNetwork(!lowNetwork)} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${lowNetwork ? 'border-emerald-300 bg-emerald-100 text-emerald-800' : 'border-slate-300 bg-white text-slate-700'}`}>
                              {lowNetwork ? t('lobby.enabled') : t('lobby.disabled')}
                            </button>
                            <span className="text-sm text-slate-500">{lowNetwork ? t('lobby.cachingEnabled') : t('lobby.standardMode')}</span>
                          </div>
                        )}
                        {noteType === 'speed' && (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <label className="text-sm font-medium text-slate-600">{t('lobby.bonusLabel')}</label>
                            <select value={speedBonus} onChange={(e) => setSpeedBonus(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                              <option>None</option>
                              <option>Small</option>
                              <option>Large</option>
                            </select>
                            <span className="text-sm text-slate-500">{t('lobby.current')}: {speedBonus}</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <FaCheckCircle aria-hidden="true" />
              Match ready
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Confirming will move you to the selected game board with the settings you configured here.
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Mode</dt>
                <dd className="font-semibold text-slate-950">{localMode || '-'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Preload</dt>
                <dd className="font-semibold text-slate-950">{preloadedCount}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-500">Speed bonus</dt>
                <dd className="font-semibold text-slate-950">{speedBonus}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="mt-5 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {t('lobby.joinNow')}
            </button>
          </aside>
        </div>

        {confirmOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-slate-950">{t('lobby.confirmTitle')}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                You are about to join a <strong>{localMode}</strong> match. Proceed to the game board?
              </p>
              <div className="mt-5 flex justify-end gap-3">
                <button type="button" onClick={() => setConfirmOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">{t('lobby.confirmCancel')}</button>
                <button type="button" onClick={handleConfirmJoin} className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">{t('lobby.confirmConfirm')}</button>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {joined && joinedKey === '1v1' && (
        <div className="mt-5">
          <OneVOneGameBoard variant="1v1" settings={joinedSettings} />
        </div>
      )}
      {joined && joinedKey === 'group' && (
        <div className="mt-5">
          <GroupGameBoard variant="Group" settings={joinedSettings} />
        </div>
      )}
      {joined && joinedKey === 'tournament' && (
        <div className="mt-5">
          <TournamentGameBoard variant="Tournament" settings={joinedSettings} />
        </div>
      )}
    </>
  );
}

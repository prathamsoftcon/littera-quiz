import React, { useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentOverviewPanel from '../../features/student/StudentOverviewPanel';
import StudentLobbyPanel from '../../features/student/StudentLobbyPanel';
// StudentBoardPanel replaced by specific board components (1v1 / Group / Tournament)
import OneVOneGameBoard from '../../features/student/1v1gameboard';
import GroupGameBoard from '../../features/student/groupegameboard';
import TournamentGameBoard from '../../features/student/tournamentgameboard';
import StudentNotificationsPanel from '../../features/student/StudentNotificationsPanel';

const sidebarItems = [
  { key: 'overview', labelKey: 'sidebar.overview' },
  { key: 'lobby', labelKey: 'sidebar.matchLobby' },
  { key: 'board', labelKey: 'sidebar.gameBoard' },
  { key: 'notifications', labelKey: 'sidebar.notifications' },
];

  const lobbyModes = ['1v1', 'Group', 'Tournament'];
  const lobbyNotes = ['lobby.note.preloaded', 'lobby.note.network', 'lobby.note.speed'];
  const notifications = [
    { titleKey: 'notifications.item.timeSlot.title', detailKey: 'notifications.item.timeSlot.detail' },
    { titleKey: 'notifications.item.reward.title', detailKey: 'notifications.item.reward.detail' },
  ];

export default function StudentPage() {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState('overview');
  const [selectedMode, setSelectedMode] = useState(lobbyModes[0]);
  const [queuePosition, setQueuePosition] = useState({ position: 12, players: 12, note: 'Auto load balancing keeps your match responsive, even on slower connections.' });
  const [diceRoll, setDiceRoll] = useState(4);
  const [actionMessage, setActionMessage] = useState('');
  const [boardVariant, setBoardVariant] = useState(null);
  const [boardSettings, setBoardSettings] = useState({});
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  function showMessage(msg) {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 2600);
  }

  function handleModeSelect(mode) {
    setSelectedMode(mode);
    showMessage(`Mode set to ${mode}`);
  }

  function handleJoin({ mode, settings } = {}) {
    const usedMode = mode || selectedMode;
    // emulate joining by bumping queue position and showing message
    setQueuePosition((p) => ({ ...p, position: Math.max(1, p.position - 1) }));
    showMessage(`Joined ${usedMode || 'match'}`);
    // store settings and navigate to appropriate board variant after join
    setBoardSettings(settings || {});
    setBoardVariant(usedMode);
    setActiveModule('board');
  }

  function handleRollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    showMessage(`You rolled a ${roll}`);
  }

  function handleViewLeaderboard() {
    setLeaderboardOpen(true);
  }

  function closeLeaderboard() {
    setLeaderboardOpen(false);
  }

  const studentMetrics = [
    { label: t('metric.blockRank'), value: '#18', accent: 'bg-[#cde6ff]' },
    { label: t('metric.accuracy'), value: '86%', accent: 'bg-[#cfeee0]' },
    { label: t('metric.quizStreak'), value: '6 days', accent: 'bg-[#ffdcbc]' },
  ];

  const studentHighlights = [
    { labelKey: 'activeSlot', value: '10:30 AM • Today', accent: 'bg-slate-900/5 text-slate-900' },
    { labelKey: 'questionsPreloaded', value: '12 items', accent: 'bg-sky-500/10 text-sky-700' },
    { labelKey: 'lowNetworkReady', value: 'Local cache', accent: 'bg-emerald-500/10 text-emerald-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <main id="main" className="mx-auto max-w-7xl space-y-6" tabIndex={-1}>
        <header className="w-full flex items-center justify-between gap-6 py-2">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('welcomeBack', { name: 'Pooja' })}</h1>
            <p className="mt-1 text-sm text-slate-600">{t('enjoyingExperience')}</p>
          </div>

          <div className="flex items-center gap-4">
            {studentHighlights.map((item) => (
              <div key={item.labelKey} className={`min-w-[140px] h-20 flex flex-col justify-center rounded-xl p-3 shadow-sm ${item.accent}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-800/80">{t(item.labelKey)}</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>

        <hr className="mt-2 border-t border-slate-200" />
        </header>

        <div className="grid gap-8 xl:grid-cols-[280px_1fr] items-start xl:items-stretch">
          <div className="space-y-6 h-full flex flex-col">
            <div className="hidden xl:block">
              <StudentSidebar
                title="Menu"
                items={sidebarItems}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
              />
            </div>
            <div className="xl:hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeModule === item.key ? 'bg-sky-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setActiveModule(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {actionMessage ? (
              <div aria-live="polite" role="status" className="rounded-md bg-sky-50 px-4 py-2 text-sm text-sky-700">{actionMessage}</div>
            ) : null}
            {activeModule === 'overview' && (
              <StudentOverviewPanel
                metrics={studentMetrics}
                upcomingSlot={{ title: 'Math Sprint • 10:30 AM', note: 'Your next match group is preloaded and ready for low-network mode.' }}
                rewardProgress={{ name: 'Silver badge', percent: 82 }}
                onJoin={handleJoin}
                defaultMode={selectedMode}
                defaultSettings={boardSettings}
              />
            )}

            {activeModule === 'lobby' && (
              <StudentLobbyPanel
                modes={lobbyModes}
                selectedMode={selectedMode}
                onModeSelect={handleModeSelect}
                onJoin={handleJoin}
                queuePosition={queuePosition}
                notes={lobbyNotes}
              />
            )}

            {activeModule === 'board' && (
              <>
                {boardVariant === '1v1' && (
                  <OneVOneGameBoard variant="1v1" settings={boardSettings} initial={{ p1: 0, p2: 0 }} />
                )}
                {boardVariant === 'Group' && (
                  <GroupGameBoard variant="Group" settings={boardSettings} />
                )}
                {boardVariant === 'Tournament' && (
                  <TournamentGameBoard variant="Tournament" settings={boardSettings} />
                )}
                {!boardVariant && (
                  <div className="rounded-2xl p-6 bg-white text-slate-700">{t('board.noSelection', 'No board selected — join a match from Lobby.')}</div>
                )}
              </>
            )}

            {activeModule === 'notifications' && (
              <StudentNotificationsPanel
                notifications={notifications.map(n => ({ title: t(n.titleKey), detail: t(n.detailKey) }))}
                progress={{ speed: '8.2s', timeSaved: '24 mins' }}
                onViewLeaderboard={handleViewLeaderboard}
              />
            )}
          </div>
        </div>
      </main>
      {leaderboardOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6">
            <h3 className="text-lg font-semibold">Leaderboard (Mock)</h3>
            <ol className="mt-4 space-y-3">
              <li className="flex items-center justify-between rounded-md bg-slate-50 p-3">
                <div><strong>1.</strong> Rahul</div>
                <div className="font-semibold">9,420 pts</div>
              </li>
              <li className="flex items-center justify-between rounded-md bg-slate-50 p-3">
                <div><strong>2.</strong> Meera</div>
                <div className="font-semibold">8,860 pts</div>
              </li>
              <li className="flex items-center justify-between rounded-md bg-slate-50 p-3">
                <div><strong>3.</strong> Anaya</div>
                <div className="font-semibold">8,420 pts</div>
              </li>
            </ol>
            <div className="mt-5 flex justify-end">
              <button onClick={closeLeaderboard} className="rounded px-4 py-2 border">Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

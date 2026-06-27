import React, { useState } from 'react';
import { FaBell, FaBolt, FaCalendarAlt, FaGamepad, FaMedal, FaTrophy, FaUsers } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentOverviewPanel from '../../features/student/StudentOverviewPanel';
import StudentLobbyPanel from '../../features/student/StudentLobbyPanel';
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
  const [queuePosition, setQueuePosition] = useState({
    position: 12,
    players: 12,
    note: 'Auto load balancing keeps your match responsive, even on slower connections.',
  });
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
    setQueuePosition((p) => ({ ...p, position: Math.max(1, p.position - 1) }));
    setBoardSettings(settings || {});
    setBoardVariant(usedMode);
    setActiveModule('board');
    showMessage(`Joined ${usedMode || 'match'}`);
  }

  function handleRollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    showMessage(`You rolled a ${roll}`);
  }

  const studentMetrics = [
    { label: t('metric.blockRank'), value: '#18', helper: 'Top 12% this week', icon: FaTrophy, accent: 'border-sky-200 bg-sky-50 text-sky-700' },
    { label: t('metric.accuracy'), value: '86%', helper: '+4% from last quiz', icon: FaBolt, accent: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
    { label: t('metric.quizStreak'), value: '6 days', helper: 'Next badge in 1 day', icon: FaMedal, accent: 'border-amber-200 bg-amber-50 text-amber-700' },
  ];

  const studentHighlights = [
    { labelKey: 'activeSlot', value: '10:30 AM Today', icon: FaCalendarAlt },
    { labelKey: 'questionsPreloaded', value: '12 items', icon: FaGamepad },
    { labelKey: 'lowNetworkReady', value: 'Local cache', icon: FaBell },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <main id="main" className="mx-auto max-w-7xl space-y-5" tabIndex={-1}>
        <header className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Student dashboard</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{t('welcomeBack', { name: 'Pooja' })}</h1>
              <p className="mt-1 text-sm text-slate-600">{t('enjoyingExperience')}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {studentHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.labelKey} className="min-w-[150px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      <Icon className="text-sky-700" aria-hidden="true" />
                      {t(item.labelKey)}
                    </div>
                    <p className="mt-2 text-base font-semibold text-slate-950">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
          <div className="space-y-6">
            <div className="hidden xl:block">
              <StudentSidebar
                title="Student menu"
                items={sidebarItems}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
              />
            </div>
            <div className="xl:hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      activeModule === item.key ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setActiveModule(item.key)}
                  >
                    {item.labelKey ? t(item.labelKey) : item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {actionMessage ? (
              <div aria-live="polite" role="status" className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800">
                {actionMessage}
              </div>
            ) : null}

            {activeModule === 'overview' && (
              <StudentOverviewPanel
                metrics={studentMetrics}
                upcomingSlot={{ title: 'Math Sprint - 10:30 AM', note: 'Your next match group is preloaded and ready for low-network mode.' }}
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
                  <OneVOneGameBoard variant="1v1" settings={boardSettings} />
                )}
                {boardVariant === 'Group' && (
                  <GroupGameBoard variant="Group" settings={boardSettings} diceRoll={diceRoll} onRollDice={handleRollDice} />
                )}
                {boardVariant === 'Tournament' && (
                  <TournamentGameBoard variant="Tournament" settings={boardSettings} diceRoll={diceRoll} onRollDice={handleRollDice} />
                )}
                {!boardVariant && (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-700">
                    <FaUsers className="mx-auto text-3xl text-slate-400" aria-hidden="true" />
                    <p className="mt-3 font-semibold text-slate-950">{t('board.noSelection', 'No board selected - join a match from Lobby.')}</p>
                    <button
                      type="button"
                      onClick={() => setActiveModule('lobby')}
                      className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Open lobby
                    </button>
                  </div>
                )}
              </>
            )}

            {activeModule === 'notifications' && (
              <StudentNotificationsPanel
                notifications={notifications.map((n) => ({ title: t(n.titleKey), detail: t(n.detailKey) }))}
                progress={{ speed: '8.2s', timeSaved: '24 mins' }}
                onViewLeaderboard={() => setLeaderboardOpen(true)}
              />
            )}
          </div>
        </div>
      </main>

      {leaderboardOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-950">Leaderboard</h3>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">Block level</span>
            </div>
            <ol className="mt-4 space-y-3">
              {[
                ['Rahul', '9,420 pts'],
                ['Meera', '8,860 pts'],
                ['Anaya', '8,420 pts'],
              ].map(([name, score], index) => (
                <li key={name} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div><strong>{index + 1}.</strong> {name}</div>
                  <div className="font-semibold">{score}</div>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex justify-end">
              <button onClick={() => setLeaderboardOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

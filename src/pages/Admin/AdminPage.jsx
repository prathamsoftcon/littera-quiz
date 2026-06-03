import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import AdminHero from '../../components/admin/AdminHero';
import AdminLiveGrid from '../../components/admin/AdminLiveGrid';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AnalyticsPanel from '../../features/admin/AnalyticsPanel';
import AnnouncementsPanel from '../../features/admin/AnnouncementsPanel';
import ApprovalPanel from '../../features/admin/ApprovalPanel';
import RewardsPanel from '../../features/admin/RewardsPanel';
import SlotsPanel from '../../features/admin/SlotsPanel';
import MasterUpload from '../../features/admin/MasterUpload';
import './AdminPage.css';

// ApprovalPanel now manages its own queue state

const slotDefaults = [
  { label: 'Morning', time: '10:30 AM', active: true, concurrency: 2500 },
  { label: 'Afternoon', time: '1:00 PM', active: true, concurrency: 1800 },
  { label: 'Evening', time: '5:30 PM', active: false, concurrency: 900 },
];

const rewardDefaults = [
  { id: 'r1', rule: 'Daily streak bonus', points: 15, enabled: true },
  { id: 'r2', rule: 'Under 7s answer speed', points: 10, enabled: true },
  { id: 'r3', rule: 'No violations in slot', points: 20, enabled: false },
];

const announcementSeed = [
  { id: 'a1', target: 'District - Jaipur', text: 'New district quiz slot added at 6:30 PM.', at: '11:20 AM' },
  { id: 'a2', target: 'All Teachers', text: 'Bulk upload validation now supports XLSX.', at: '10:05 AM' },
];

export default function AdminPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ players: 12480, slots: 327, violations: 41 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [rejectReason, setRejectReason] = useState('');
  const [pendingCount, setPendingCount] = useState(0);
  const [slots, setSlots] = useState(slotDefaults);
  const [rewardRules, setRewardRules] = useState(rewardDefaults);
  const [announcements, setAnnouncements] = useState(announcementSeed);
  const [draftAnnouncement, setDraftAnnouncement] = useState({ target: 'All Students', text: '' });
  const [activeModule, setActiveModule] = useState('approval');

  useEffect(() => {
    const tick = setInterval(() => {
      setStats((prev) => ({
        players: prev.players + Math.round(Math.random() * 45 - 22),
        slots: Math.max(250, prev.slots + Math.round(Math.random() * 8 - 4)),
        violations: Math.max(5, prev.violations + Math.round(Math.random() * 5 - 2)),
      }));
    }, 4500);

    return () => clearInterval(tick);
  }, []);

  // ApprovalPanel computes its own filtered queue and selected item internally.

  const analytics = useMemo(() => {
    const weeklyUsers = [73, 68, 79, 84, 88, 81, 91];
    const completionRate = [61, 64, 69, 72, 74, 78, 82];
    const teacherParticipation = [42, 56, 51, 63, 66, 71, 77];
    return { weeklyUsers, completionRate, teacherParticipation };
  }, []);

  // Approval actions handled inside ApprovalPanel


  function updateSlot(index, key, value) {
    setSlots((prev) => prev.map((slot, i) => (i === index ? { ...slot, [key]: value } : slot)));
  }

  function toggleReward(id) {
    setRewardRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)));
  }

  function sendAnnouncement() {
    if (!draftAnnouncement.text.trim()) return;
    const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newItem = {
      id: `a${Date.now()}`,
      target: draftAnnouncement.target,
      text: draftAnnouncement.text.trim(),
      at: stamp,
    };
    setAnnouncements((prev) => [newItem, ...prev].slice(0, 6));
    setDraftAnnouncement((prev) => ({ ...prev, text: '' }));
  }

  const sidebarItems = [
    { key: 'approval', label: t('adminSidebarApproval') },
    // { key: 'slots', label: 'Slot Controls' },
    { key: 'upload', label: t('adminSidebarUpload') },
    { key: 'announce', label: t('adminSidebarAnnouncements') },
    { key: 'rewards', label: t('adminSidebarRewards') },
    { key: 'analytics', label: t('adminSidebarAnalytics') },
  ];

  return (
    <section className="screen admin-screen">
      <div className="admin-workspace">
        <AdminSidebar
          title={t('adminDashboardMenu')}
          items={sidebarItems}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          pendingCount={pendingCount}
        />

        <div className="admin-content-column">
          <AdminHero t={t} />

          <AdminLiveGrid stats={stats} pendingCount={pendingCount} t={t} />

          <div className="admin-main-grid">
          {activeModule === 'approval' ? (
            <ApprovalPanel t={t} onPendingCountChange={setPendingCount} />
          ) : null}

          {activeModule === 'slots' ? (
            <SlotsPanel slots={slots} updateSlot={updateSlot} />
          ) : null}

          {activeModule === 'upload' ? (
            <article className="panel admin-panel active-panel">
              <div className="panel-title">{t('adminGoMasterUpload')}</div>
              <MasterUpload />
            </article>
          ) : null}

          {activeModule === 'announce' ? (
            <AnnouncementsPanel
              t={t}
              announcements={announcements}
              draftAnnouncement={draftAnnouncement}
              setDraftAnnouncement={setDraftAnnouncement}
              sendAnnouncement={sendAnnouncement}
            />
          ) : null}

          {activeModule === 'rewards' ? (
            <RewardsPanel t={t} rewardRules={rewardRules} toggleReward={toggleReward} />
          ) : null}

          {activeModule === 'analytics' ? (
            <AnalyticsPanel t={t} analytics={analytics} />
          ) : null}
        </div>
        </div>
      </div>
    </section>
  );
}

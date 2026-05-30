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
import UploadPanel from '../../features/admin/UploadPanel';
import './AdminPage.css';

const initialQueue = [
  {
    id: 'Q-1782',
    title: 'Image MCQ - Fractions of Pizza',
    teacher: 'Ms. Patel',
    type: 'MCQ',
    category: 'Math',
    difficulty: 'Medium',
    status: 'Pending',
    age: '18m',
  },
  {
    id: 'Q-1783',
    title: 'Fill Blank - Photosynthesis',
    teacher: 'Mr. Khan',
    type: 'Fill',
    category: 'Science',
    difficulty: 'Easy',
    status: 'Pending',
    age: '24m',
  },
  {
    id: 'Q-1785',
    title: 'Match Capitals and States',
    teacher: 'Ms. Das',
    type: 'Match',
    category: 'Geography',
    difficulty: 'Hard',
    status: 'Under review',
    age: '36m',
  },
  {
    id: 'Q-1788',
    title: 'Audio Question - Birds Sound',
    teacher: 'Mr. Nair',
    type: 'Media',
    category: 'EVS',
    difficulty: 'Medium',
    status: 'Pending',
    age: '42m',
  },
];

const uploadChecklist = [
  { type: 'State', required: 'State Name, State Code' },
  { type: 'District', required: 'District Name, District Code, State Code' },
  { type: 'Block', required: 'Block Name, Block Code, State Code, District Code' },
  { type: 'CRC', required: 'CRC Name, CRC Code, State Code, District Code, Block Code' },
  { type: 'Village', required: 'Village Name, Village Code, State Code, District Code, Block Code, CRC Code' },
  { type: 'School', required: 'School Name, School Code, State Code, District Code, Block Code, CRC Code, Village Code' },
];

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
  const [queue, setQueue] = useState(initialQueue);
  const [selectedId, setSelectedId] = useState(initialQueue[0].id);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [rejectReason, setRejectReason] = useState('');
  const [slots, setSlots] = useState(slotDefaults);
  const [rewardRules, setRewardRules] = useState(rewardDefaults);
  const [announcements, setAnnouncements] = useState(announcementSeed);
  const [draftAnnouncement, setDraftAnnouncement] = useState({ target: 'All Students', text: '' });
  const [validation, setValidation] = useState({ total: 500, valid: 482, duplicate: 4, missing: 6, parentRef: 8 });
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

  const filteredQueue = useMemo(() => {
    return queue.filter((item) => {
      if (statusFilter !== 'All' && item.status !== statusFilter) return false;
      if (typeFilter !== 'All' && item.type !== typeFilter) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      return (
        item.id.toLowerCase().includes(q)
        || item.title.toLowerCase().includes(q)
        || item.teacher.toLowerCase().includes(q)
        || item.category.toLowerCase().includes(q)
      );
    });
  }, [queue, search, statusFilter, typeFilter]);

  const selectedItem = filteredQueue.find((item) => item.id === selectedId) || filteredQueue[0] || null;
  const pendingCount = queue.filter((q) => q.status === 'Pending').length;

  const analytics = useMemo(() => {
    const weeklyUsers = [73, 68, 79, 84, 88, 81, 91];
    const completionRate = [61, 64, 69, 72, 74, 78, 82];
    const teacherParticipation = [42, 56, 51, 63, 66, 71, 77];
    return { weeklyUsers, completionRate, teacherParticipation };
  }, []);

  function updateQueueStatus(id, nextStatus) {
    setQueue((prev) => prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
    if (nextStatus !== 'Rejected') {
      setRejectReason('');
    }
  }

  function applyApprove() {
    if (!selectedItem) return;
    updateQueueStatus(selectedItem.id, 'Approved');
  }

  function applyReject() {
    if (!selectedItem) return;
    if (!rejectReason.trim()) {
      alert(t('adminEnterRejectionReason'));
      return;
    }
    updateQueueStatus(selectedItem.id, 'Rejected');
  }

  function runValidationPreview() {
    setValidation((prev) => ({
      ...prev,
      total: prev.total + 25,
      valid: Math.max(0, prev.valid + Math.round(Math.random() * 12 - 4)),
      duplicate: Math.max(0, prev.duplicate + Math.round(Math.random() * 3 - 1)),
      missing: Math.max(0, prev.missing + Math.round(Math.random() * 3 - 1)),
      parentRef: Math.max(0, prev.parentRef + Math.round(Math.random() * 4 - 1)),
    }));
  }

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

  const importReady = validation.duplicate === 0 && validation.missing === 0 && validation.parentRef === 0;
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
            <ApprovalPanel
              t={t}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              filteredQueue={filteredQueue}
              selectedItem={selectedItem}
              setSelectedId={setSelectedId}
              rejectReason={rejectReason}
              setRejectReason={setRejectReason}
              applyReject={applyReject}
              applyApprove={applyApprove}
            />
          ) : null}

          {activeModule === 'slots' ? (
            <SlotsPanel slots={slots} updateSlot={updateSlot} />
          ) : null}

          {activeModule === 'upload' ? (
            <UploadPanel
              t={t}
              validation={validation}
              uploadChecklist={uploadChecklist}
              runValidationPreview={runValidationPreview}
              importReady={importReady}
            />
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

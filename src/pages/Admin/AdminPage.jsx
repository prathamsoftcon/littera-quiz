import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../context/TranslationContext';
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

function getStatusTone(status) {
  if (status === 'Approved') return 'ok';
  if (status === 'Rejected') return 'danger';
  if (status === 'Under review') return 'warn';
  return 'pending';
}

function getStatusLabel(status, t) {
  if (status === 'Approved') return t('adminApproved');
  if (status === 'Rejected') return t('adminRejected');
  if (status === 'Under review') return t('adminUnderReview');
  return t('adminPending');
}

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

  const statusOptions = [
    { value: 'All', label: t('adminAll') },
    { value: 'Pending', label: t('adminPending') },
    { value: 'Under review', label: t('adminUnderReview') },
    { value: 'Approved', label: t('adminApproved') },
    { value: 'Rejected', label: t('adminRejected') },
  ];
  const typeOptions = [
    { value: 'All', label: t('adminAll') },
    { value: 'MCQ', label: t('adminTypeMcq') },
    { value: 'Fill', label: t('adminTypeFill') },
    { value: 'Match', label: t('adminTypeMatch') },
    { value: 'Media', label: t('adminTypeMedia') },
  ];

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
        <aside className="admin-sidebar" aria-label="Admin modules">
          <h3>{t('adminDashboardMenu')}</h3>
          <div className="admin-sidebar-list">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`admin-nav-btn ${activeModule === item.key ? 'active' : ''}`}
                onClick={() => setActiveModule(item.key)}
              >
                <span>{item.label}</span>
                {item.key === 'approval' ? <b>{pendingCount}</b> : null}
              </button>
            ))}
          </div>
        </aside>

        <div className="admin-content-column">
          <div className="admin-hero">
            <div>
              <p className="eyebrow">{t('adminEyebrow')}</p>
              <h2>{t('adminControlCenter')}</h2>
            </div>
            <div className="admin-hero-actions">
              <Link to="/question-bank/approval" className="admin-link-btn">{t('adminOpenApprovalQueue')}</Link>
              <Link to="/admin/master-upload" className="admin-link-btn ghost">{t('adminGoMasterUpload')}</Link>
            </div>
          </div>

          <div className="admin-live-grid">
            <article className="admin-live-card players">
              <span>{t('adminLivePlayers')}</span>
              <strong>{stats.players.toLocaleString()}</strong>
              <small>{t('adminRealtimeCompetitionSessions')}</small>
            </article>
            <article className="admin-live-card slots">
              <span>{t('adminSlotsActive')}</span>
              <strong>{stats.slots}</strong>
              <small>{t('adminConcurrentQuizWindows')}</small>
            </article>
            <article className="admin-live-card violations">
              <span>{t('adminViolationsLogged')}</span>
              <strong>{stats.violations}</strong>
              <small>{t('adminCameraChecks')}</small>
            </article>
            <article className="admin-live-card queue">
              <span>{t('adminPendingApprovals')}</span>
              <strong>{pendingCount}</strong>
              <small>{t('adminQuestionBankModeration')}</small>
            </article>
          </div>

          <div className="admin-main-grid">
          {activeModule === 'approval' ? (
            <article className="panel admin-panel queue-panel active-panel">
              <div className="panel-title">{t('adminSidebarApproval')}</div>

          <div className="queue-toolbar">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="admin-input"
              placeholder={t('adminSearchPlaceholder')}
            />

            <select className="admin-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select className="admin-select" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="queue-content">
            <div className="queue-list">
              {filteredQueue.length === 0 ? (
                <div className="empty-state">{t('adminNoRows')}</div>
              ) : (
                filteredQueue.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`queue-item ${selectedItem?.id === item.id ? 'active' : ''}`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className="queue-item-head">
                      <strong>{item.title}</strong>
                      <span className={`status-pill ${getStatusTone(item.status)}`}>{getStatusLabel(item.status, t)}</span>
                    </div>
                    <p>{item.id} • {item.teacher} • {item.age}</p>
                    <div className="queue-tags">
                      <span>{item.type}</span>
                      <span>{item.category}</span>
                      <span>{item.difficulty}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="review-detail">
              {selectedItem ? (
                <>
                  <h3>{selectedItem.title}</h3>
                  <p className="muted-text">{t('adminTeacherLabel')}: {selectedItem.teacher} • ID: {selectedItem.id}</p>
                  <div className="review-meta">
                    <span>{selectedItem.type}</span>
                    <span>{selectedItem.category}</span>
                    <span>{selectedItem.difficulty}</span>
                    <span>{getStatusLabel(selectedItem.status, t)}</span>
                  </div>

                  <label htmlFor="reject-reason">{t('adminRejectionReason')}</label>
                  <textarea
                    id="reject-reason"
                    className="admin-textarea"
                    value={rejectReason}
                    onChange={(event) => setRejectReason(event.target.value)}
                    placeholder={t('adminRejectionPlaceholder')}
                  />

                  <div className="review-actions">
                    <button className="admin-btn danger" type="button" onClick={applyReject}>{t('adminReject')}</button>
                    <button className="admin-btn" type="button" onClick={applyApprove}>{t('adminApprove')}</button>
                  </div>
                </>
              ) : (
                <div className="empty-state">{t('adminPickQuestion')}</div>
              )}
            </div>
          </div>
            </article>
          ) : null}

          {activeModule === 'slots' ? (
            <article className="panel admin-panel active-panel">
              <div className="panel-title">Competition Slots and Concurrency</div>
              <div className="slot-list">
                {slots.map((slot, index) => (
                  <div className="slot-card" key={`${slot.label}-${slot.time}`}>
                    <div>
                      <strong>{slot.label}</strong>
                      <p>{slot.time}</p>
                    </div>

                    <label className="switch-row">
                      <span>Enabled</span>
                      <input
                        type="checkbox"
                        checked={slot.active}
                        onChange={(event) => updateSlot(index, 'active', event.target.checked)}
                      />
                    </label>

                    <label className="range-label" htmlFor={`concurrency-${index}`}>
                      Concurrency limit: {slot.concurrency}
                    </label>
                    <input
                      id={`concurrency-${index}`}
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={slot.concurrency}
                      onChange={(event) => updateSlot(index, 'concurrency', Number(event.target.value))}
                    />
                  </div>
                ))}
              </div>
              <div className="status-strip">Slot participation controls support limited-time sessions and load balancing.</div>
            </article>
          ) : null}

          {activeModule === 'upload' ? (
            <article className="panel admin-panel active-panel">
              <div className="panel-title">{t('adminMasterUploadValidation')}</div>
              <div className="upload-stats">
                <div><strong>{validation.total}</strong><span>{t('adminTotalRows')}</span></div>
                <div><strong>{validation.valid}</strong><span>{t('adminValidRows')}</span></div>
                <div><strong>{validation.duplicate}</strong><span>{t('adminDuplicates')}</span></div>
                <div><strong>{validation.missing}</strong><span>{t('adminMissingFields')}</span></div>
                <div><strong>{validation.parentRef}</strong><span>{t('adminParentCodeErrors')}</span></div>
              </div>

              <div className="upload-order-panel">
                {uploadChecklist.map((row, index) => (
                  <div className="upload-order-row" key={row.type}>
                    <b>{index + 1}. {row.type}</b>
                    <span>{row.required}</span>
                  </div>
                ))}
              </div>

              <div className="inline-actions">
                <button type="button" className="admin-btn ghost" onClick={runValidationPreview}>{t('adminRunValidationPreview')}</button>
                <button type="button" className="admin-btn" disabled={!importReady}>{t('adminConfirmImport')}</button>
              </div>
            </article>
          ) : null}

          {activeModule === 'announce' ? (
            <article className="panel admin-panel active-panel">
              <div className="panel-title">{t('adminAnnouncementsBroadcasts')}</div>
              <div className="announce-composer">
                <select
                  className="admin-select"
                  value={draftAnnouncement.target}
                  onChange={(event) => setDraftAnnouncement((prev) => ({ ...prev, target: event.target.value }))}
                >
                  <option>{t('adminAudienceAllStudents')}</option>
                  <option>{t('adminAudienceAllTeachers')}</option>
                  <option>{t('adminAudienceDistrictJaipur')}</option>
                  <option>{t('adminAudienceBlockAmber')}</option>
                  <option>{t('adminAudienceRoleAdmin')}</option>
                </select>
                <textarea
                  className="admin-textarea"
                  value={draftAnnouncement.text}
                  onChange={(event) => setDraftAnnouncement((prev) => ({ ...prev, text: event.target.value }))}
                  placeholder={t('adminAnnouncementPlaceholder')}
                />
                <button type="button" className="admin-btn" onClick={sendAnnouncement}>{t('adminSendBroadcast')}</button>
              </div>

              <div className="announce-list">
                {announcements.map((item) => (
                  <div className="announce-row" key={item.id}>
                    <div>
                      <strong>{item.target}</strong>
                      <p>{item.text}</p>
                    </div>
                    <small>{item.at}</small>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {activeModule === 'rewards' ? (
            <article className="panel admin-panel active-panel">
              <div className="panel-title">{t('adminRewardsRules')}</div>
              <div className="reward-list">
                {rewardRules.map((rule) => (
                  <div key={rule.id} className="reward-row">
                    <div>
                      <strong>{rule.rule}</strong>
                      <p>{rule.points} {t('adminPoints')}</p>
                    </div>
                    <button
                      type="button"
                      className={`mini-toggle ${rule.enabled ? 'on' : ''}`}
                      onClick={() => toggleReward(rule.id)}
                    >
                      {rule.enabled ? t('adminEnabled') : t('adminDisabled')}
                    </button>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {activeModule === 'analytics' ? (
            <article className="panel admin-panel active-panel">
              <div className="panel-title">{t('adminAnalyticsSnapshot')}</div>

              <div className="analytics-set">
                <div>
                  <label>{t('adminWeeklyActiveUsers')}</label>
                  <div className="sparkline">
                    {analytics.weeklyUsers.map((value, i) => (
                      <span key={`wau-${i}`} style={{ height: `${value}%` }} />
                    ))}
                  </div>
                </div>

                <div>
                  <label>{t('adminQuizCompletionRate')}</label>
                  <div className="sparkline success">
                    {analytics.completionRate.map((value, i) => (
                      <span key={`cr-${i}`} style={{ height: `${value}%` }} />
                    ))}
                  </div>
                </div>

                <div>
                  <label>{t('adminTeacherParticipation')}</label>
                  <div className="sparkline warning">
                    {analytics.teacherParticipation.map((value, i) => (
                      <span key={`tp-${i}`} style={{ height: `${value}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
        </div>
      </div>
    </section>
  );
}

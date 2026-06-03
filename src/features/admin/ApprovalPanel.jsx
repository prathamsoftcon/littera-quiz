import React, { useEffect, useMemo, useState } from 'react';

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
export default function ApprovalPanel({ t, onPendingCountChange }) {
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

  const [queue, setQueue] = useState(initialQueue);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(initialQueue[0]?.id || null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (typeof onPendingCountChange === 'function') {
      const pending = queue.filter((q) => q.status === 'Pending').length;
      onPendingCountChange(pending);
    }
  }, [queue, onPendingCountChange]);

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

  return (
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
                <p>{item.id} &bull; {item.teacher} &bull; {item.age}</p>
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
              <p className="muted-text">{t('adminTeacherLabel')}: {selectedItem.teacher} &bull; ID: {selectedItem.id}</p>
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
  );
}

import React, { useState } from 'react';
import Panel from '../../components/Panel';
import QueueTable from '../../components/QueueTable';
import ReviewDetail from '../../features/question-bank/ReviewDetail';
import { useTranslation } from '../../context/TranslationContext';

const mock = [
  { id: 1, title: 'Fractions MCQ', teacher: 'Ms. Patel', type: 'mcq', status: 'Pending' },
  { id: 2, title: 'Audio spelling', teacher: 'Mr. Khan', type: 'media', status: 'Pending' },
];

export default function ApprovalQueuePage() {
  const [rows, setRows] = useState(mock);
  const [selected, setSelected] = useState(null);
  const [reviewItem, setReviewItem] = useState(null);
  const { t } = useTranslation();

  function handleApprove(item) {
    setRows((prev) => prev.map((row) => (row.id === item.id ? { ...row, status: 'Approved' } : row)));
  }

  function handleReject(item) {
    setRows((prev) => prev.map((row) => (row.id === item.id ? { ...row, status: 'Rejected' } : row)));
  }

  function handleReview(item) {
    setReviewItem(item);
  }

  function closeReview() {
    setReviewItem(null);
  }

  return (
    <div className="screen">
      <div className="screen-heading">
        <h2>{t('adminApprovalQueueTitle')}</h2>
      </div>

      <div className="grid one">
        <Panel>
          <QueueTable
            rows={rows}
            onSelect={setSelected}
            onApprove={handleApprove}
            onReject={handleReject}
            onReview={handleReview}
          />
        </Panel>
      </div>

      {reviewItem ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{t('adminReviewQuestion')}</h3>
              <button type="button" className="modal-close" onClick={closeReview} aria-label={t('closeReview')}>
                x
              </button>
            </div>
            <ReviewDetail
              item={reviewItem}
              onApprove={(item) => {
                handleApprove(item);
                closeReview();
              }}
              onReject={(item) => {
                handleReject(item);
                closeReview();
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

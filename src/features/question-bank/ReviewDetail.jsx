import React from 'react';

export default function ReviewDetail({ item = null, onApprove, onReject }) {
  if (!item) {
    return <div className="review-card">Select an item from the queue to see details.</div>;
  }

  return (
    <div className="review-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700 }}>{item.title}</div>
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>Submitted by {item.teacher}</div>
        </div>
        <div className="actions" style={{ minWidth: 160 }}>
          <button onClick={() => onReject && onReject(item)}>Reject</button>
          <button className="primary" onClick={() => onApprove && onApprove(item)}>Approve</button>
        </div>
      </div>
    </div>
  );
}

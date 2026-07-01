import React from 'react';

export default function ReviewDetail({ item = null, onApprove, onReject }) {
  if (!item) {
    return <div className="review-card">Select an item from the queue to see details.</div>;
  }

  return (
    <div className="review-card">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold">{item.title}</div>
          <div className="text-[13px] text-muted">Submitted by {item.teacher}</div>
        </div>
        <div className="actions min-w-40">
          <button onClick={() => onReject && onReject(item)}>Reject</button>
          <button className="primary" onClick={() => onApprove && onApprove(item)}>Approve</button>
        </div>
      </div>
    </div>
  );
}

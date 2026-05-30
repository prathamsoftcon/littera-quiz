import React from 'react';

export default function QueueTable({
  rows = [],
  onSelect,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onApprove,
  onReject,
  onReview,
}) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  function toggleSelectAll() {
    if (!onSelectionChange) return;

    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(rows.map((r) => r.id));
    }
  }

  function toggleRow(id) {
    if (!onSelectionChange) return;

    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((s) => s !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }

  return (
    <>
      <style>{`
        .queue-table-wrapper {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
        }

        .queue-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .queue-table thead {
          background: #f8fafc;
        }

        .queue-table th {
          padding: 18px 20px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
          border-bottom: 2px solid #e2e8f0;
          white-space: nowrap;
        }

        .queue-table td {
          padding: 18px 20px;
          font-size: 14px;
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .queue-table th:nth-child(1),
        .queue-table td:nth-child(1) {
          width: 34%;
        }

        .queue-table th:nth-child(2),
        .queue-table td:nth-child(2) {
          width: 20%;
        }

        .queue-table th:nth-child(3),
        .queue-table td:nth-child(3) {
          width: 12%;
        }

        .queue-table th:nth-child(4),
        .queue-table td:nth-child(4) {
          width: 12%;
        }

        .queue-table th:nth-child(5),
        .queue-table td:nth-child(5) {
          width: 22%;
        }

        .review-row {
          transition: all 0.2s ease;
        }

        .review-row:hover {
          background: #f8fafc;
        }

        .review-row:last-child td {
          border-bottom: none;
        }

        .question-title {
          display: inline-block;
          max-width: 100%;
          font-weight: 600;
          color: #0f172a;
        }

        .question-type {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: #eef2ff;
          color: #4338ca;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-approved {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: #dcfce7;
          color: #15803d;
          font-size: 12px;
          font-weight: 600;
        }

        .status-rejected {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 12px;
          font-weight: 600;
        }

        .status-pending {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: #fef3c7;
          color: #d97706;
          font-size: 12px;
          font-weight: 600;
        }

        .queue-action-cell {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
        }

        .queue-action-btn {
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 40px;
        }

        .queue-action-btn:hover {
          transform: translateY(-1px);
        }

        .queue-action-btn.approve {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #86efac;
        }

        .queue-action-btn.approve:hover {
          background: #22c55e;
          color: white;
        }

        .queue-action-btn.reject {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }

        .queue-action-btn.reject:hover {
          background: #ef4444;
          color: white;
        }

        .queue-action-btn.review {
          background: #dbeafe;
          color: #2563eb;
          border: 1px solid #93c5fd;
        }

        .queue-action-btn.review:hover {
          background: #3b82f6;
          color: white;
        }

        .queue-table input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .empty-state {
          text-align: center;
          padding: 40px !important;
          color: #94a3b8;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .queue-table-wrapper {
            overflow-x: auto;
          }

          .queue-table {
            min-width: 850px;
          }
        }
      `}</style>

      <div className="queue-table-wrapper">
        <table className="queue-table">
          <thead>
            <tr>
              {selectable && (
                <th style={{ width: 50 }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
              )}

              <th>Question</th>
              <th>Teacher</th>
              <th>Type</th>
              <th>Status</th>

              {(onApprove || onReject || onReview) && (
                <th>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((r) => (
                <tr key={r.id} className="review-row">
                  {selectable && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(r.id)}
                        onChange={() => toggleRow(r.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}

                  <td onClick={() => onSelect?.(r)}>
                    <span className="question-title">
                      {r.title}
                    </span>
                  </td>

                  <td onClick={() => onSelect?.(r)}>
                    {r.teacher}
                  </td>

                  <td onClick={() => onSelect?.(r)}>
                    <span className="question-type">
                      {r.type}
                    </span>
                  </td>

                  <td onClick={() => onSelect?.(r)}>
                    <span className={getStatusClass(r.status)}>
                      {r.status}
                    </span>
                  </td>

                  {(onApprove || onReject || onReview) && (
                    <td>
                      <div className="queue-action-cell">
                        {onReject && (
                          <button
                            className="queue-action-btn reject"
                            onClick={() => onReject(r)}
                          >
                            Reject
                          </button>
                        )}

                        {onReview && (
                          <button
                            className="queue-action-btn review"
                            onClick={() => onReview(r)}
                          >
                            Review
                          </button>
                        )}

                        {onApprove && (
                          <button
                            className="queue-action-btn approve"
                            onClick={() => onApprove(r)}
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  No questions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
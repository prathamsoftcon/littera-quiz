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
      <div className="queue-table-wrapper">
        <table className="queue-table">
          <thead>
            <tr>
              {selectable && (
                <th className="w-[50px]">
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

import React from 'react';

export default function QueueTable({
  rows = [],
  onSelect,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
}) {
  const allSelected = rows.length > 0 && selectedIds.length === rows.length;

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
    <table>
      <thead>
        <tr>
          {selectable && (
            <th style={{ width: 36 }}>
              <input type="checkbox" aria-label="select-all" checked={allSelected} onChange={toggleSelectAll} />
            </th>
          )}
          <th>Question</th>
          <th>Teacher</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
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
            <td onClick={() => onSelect && onSelect(r)}>{r.title}</td>
            <td onClick={() => onSelect && onSelect(r)}>{r.teacher}</td>
            <td onClick={() => onSelect && onSelect(r)}>{r.type}</td>
            <td onClick={() => onSelect && onSelect(r)}>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

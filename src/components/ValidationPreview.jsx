import React from 'react';

export default function ValidationPreview({ total = 240, valid = 228, errors = 12 }) {
  return (
    <div>
      <div className="metric-row stacked">
        <div><strong>{total}</strong><span>Total rows</span></div>
        <div><strong>{valid}</strong><span>Valid rows</span></div>
        <div><strong>{errors}</strong><span>Rows with errors</span></div>
      </div>
      {errors > 0 && <div className="status-strip warning">Errors: missing category, invalid answer, unsupported media</div>}
    </div>
  );
}

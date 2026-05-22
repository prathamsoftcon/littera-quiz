import React from 'react';
import UploadBox from './UploadBox';

export default function MasterUpload({ onImport }) {
  return (
    <div>
      <UploadBox />
      <div style={{ marginTop: 10, color: 'var(--muted)', fontSize: 13 }}>CSV mapping and preview for master data import</div>
      <button className="primary" style={{ marginTop: 12 }} onClick={() => onImport && onImport()}>Validate & Import</button>
    </div>
  );
}

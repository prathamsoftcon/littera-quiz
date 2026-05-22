import React from 'react';

export default function UploadBox({ onFile }) {
  return (
    <div className="upload-box" onClick={() => onFile && onFile(null)}>
      <strong>CSV / XLSX</strong>
      <span>Drag file here or choose from device</span>
    </div>
  );
}

import React from 'react';

export default function Dice({ value = 4 }) {
  return (
    <div style={{ padding: 8, border: '1px solid #ccc', borderRadius: 6, display: 'inline-block' }}>
      <strong>Dice:</strong> {value}
    </div>
  );
}

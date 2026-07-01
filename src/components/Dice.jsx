import React from 'react';

export default function Dice({ value = 4 }) {
  return (
    <div className="inline-block rounded-md border border-slate-300 p-2">
      <strong>Dice:</strong> {value}
    </div>
  );
}

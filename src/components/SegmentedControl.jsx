import React from 'react';

export default function SegmentedControl({ options = [], value, onChange }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={opt.value === value ? 'active' : ''}
          onClick={() => onChange && onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

import React from 'react';

export function Input({ value, onChange, placeholder, className = '' }) {
  return (
    <div className={`input ${className}`}>
      <input
        style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export function Textarea({ value, onChange, placeholder, className = '' }) {
  return (
    <div className={`textarea ${className}`}>
      <textarea
        style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

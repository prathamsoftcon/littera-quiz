import React from 'react';

export function Input({ value, onChange, placeholder, className = '' }) {
  return (
    <div className={`input ${className}`}>
      <input
        className="w-full border-0 bg-transparent outline-none"
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
        className="w-full border-0 bg-transparent outline-none"
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

import React from 'react';

export default function OTPBoxes({ length = 6, value = '', onChange }) {
  const chars = String(value || '').split('').slice(0, length);
  return (
    <div className="otp-row" aria-label="OTP boxes">
      {Array.from({ length }).map((_, i) => (
        <span key={i}>{chars[i] || ''}</span>
      ))}
    </div>
  );
}

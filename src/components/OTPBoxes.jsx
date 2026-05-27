import React, { useMemo, useRef } from 'react';

export default function OTPBoxes({ length = 6, value = '', onChange }) {
  const refs = useRef([]);
  const chars = useMemo(() => String(value || '').split('').slice(0, length), [value, length]);

  const emitChange = (nextChars) => {
    const nextValue = nextChars.join('').replace(/\D/g, '').slice(0, length);
    if (onChange) {
      onChange(nextValue);
    }
  };

  const handleChange = (index, raw) => {
    const digit = String(raw || '').replace(/\D/g, '').slice(-1);
    const nextChars = Array.from({ length }, (_, i) => chars[i] || '');
    nextChars[index] = digit;
    emitChange(nextChars);
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !chars[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      refs.current[index - 1]?.focus();
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, length);
    if (!text) {
      return;
    }
    const nextChars = Array.from({ length }, (_, i) => text[i] || chars[i] || '');
    emitChange(nextChars);
    const focusIndex = Math.min(text.length, length - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div className="otp-row" aria-label="OTP boxes">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="otp-cell"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={chars[i] || ''}
          aria-label={`OTP digit ${i + 1}`}
          onChange={(event) => handleChange(i, event.target.value)}
          onKeyDown={(event) => handleKeyDown(i, event)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}

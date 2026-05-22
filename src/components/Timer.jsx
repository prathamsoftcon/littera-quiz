import React, { useEffect, useState } from 'react';

export default function Timer({ start = 30 }) {
  const [sec, setSec] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return <div className="timer">Time left: <strong>{sec}s</strong></div>;
}

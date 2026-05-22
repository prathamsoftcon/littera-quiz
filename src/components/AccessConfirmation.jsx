import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccessConfirmation({ summary, onContinue, role = 'teacher' }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const options = ['Village', 'CRC', 'Block', 'District'];

  const handleContinue = () => {
    if (onContinue) onContinue(selected);
    if (role === 'teacher') navigate('/teacher');
    else navigate('/student');
  };

  return (
    <div>
      <div className="map-stack" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
        {options.map((o) => (
          <div
            key={o}
            onClick={() => setSelected(o)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 8,
              borderRadius: 8,
              cursor: 'pointer',
              background: selected === o ? '#f8faf8' : '#fff',
              border: selected === o ? '1px solid #e6f4ef' : '1px solid transparent'
            }}
          >
            <div style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              border: '2px solid',
              borderColor: selected === o ? '#0f766e' : '#cbd5e1',
              background: selected === o ? '#0f766e' : '#fff'
            }} />
            <div style={{ fontSize: 14 }}>{o}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          className="primary"
          disabled={!selected}
          onClick={handleContinue}
          style={{
            opacity: selected ? 1 : 0.6,
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

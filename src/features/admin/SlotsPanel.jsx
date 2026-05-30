import React from 'react';

export default function SlotsPanel({ slots, updateSlot }) {
  return (
    <article className="panel admin-panel active-panel">
      <div className="panel-title">Competition Slots and Concurrency</div>
      <div className="slot-list">
        {slots.map((slot, index) => (
          <div className="slot-card" key={`${slot.label}-${slot.time}`}>
            <div>
              <strong>{slot.label}</strong>
              <p>{slot.time}</p>
            </div>

            <label className="switch-row">
              <span>Enabled</span>
              <input
                type="checkbox"
                checked={slot.active}
                onChange={(event) => updateSlot(index, 'active', event.target.checked)}
              />
            </label>

            <label className="range-label" htmlFor={`concurrency-${index}`}>
              Concurrency limit: {slot.concurrency}
            </label>
            <input
              id={`concurrency-${index}`}
              type="range"
              min="500"
              max="5000"
              step="100"
              value={slot.concurrency}
              onChange={(event) => updateSlot(index, 'concurrency', Number(event.target.value))}
            />
          </div>
        ))}
      </div>
      <div className="status-strip">Slot participation controls support limited-time sessions and load balancing.</div>
    </article>
  );
}

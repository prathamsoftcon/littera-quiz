import React from 'react';

export default function LiveMonitoring({ stats = { players: 12480, slots: 327, violations: 41 } }) {
  return (
    <div className="live-monitoring">
      <div className="lm-cards">
        <div className="lm-card lm-players">
          <div className="lm-value">{stats.players}</div>
          <div className="lm-label">Live players</div>
        </div>

        <div className="lm-card lm-slots">
          <div className="lm-value">{stats.slots}</div>
          <div className="lm-label">Slots active</div>
        </div>

        <div className="lm-card lm-violations">
          <div className="lm-value">{stats.violations}</div>
          <div className="lm-label">Violations logged</div>
        </div>
      </div>
    </div>
  );
}

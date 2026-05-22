import React from 'react';
import Panel from '../../components/Panel';

export default function RewardsPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Achievements & incentives</p>
        <h2>Rewards</h2>
      </div>

      <div className="grid two">
        <Panel>
          <div className="rewards-list">Badges and rewards will be listed here</div>
        </Panel>

        <Panel title="Redeem">
          <div className="redeem-placeholder">Redeem modal / flow</div>
        </Panel>
      </div>
    </div>
  );
}

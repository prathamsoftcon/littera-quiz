import React from 'react';
import Panel from '../../components/Panel';

export default function LeaderboardsPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Performance & rankings</p>
        <h2>Leaderboards</h2>
      </div>

      <div className="grid one">
        <Panel>
          <div className="leaderboard-placeholder">Leaderboard table will appear here</div>
        </Panel>
      </div>
    </div>
  );
}

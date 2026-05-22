import React from 'react';
import Panel from '../../components/Panel';

export default function MatchLobbyPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Multiplayer matches</p>
        <h2>Match Lobby</h2>
      </div>

      <div className="grid two">
        <Panel>
          <div className="lobby-list">Available matches and join controls</div>
        </Panel>

        <Panel title="Players">
          <div className="player-list">Player list and presence</div>
        </Panel>
      </div>
    </div>
  );
}

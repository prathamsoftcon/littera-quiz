import React from 'react';
import Panel from '../../components/Panel';
import Board from '../../components/Board';
import QuestionCard from '../../components/QuestionCard';
import Dice from '../../components/Dice';
import Timer from '../../components/Timer';

export default function StudentPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Student player experience</p>
        <h2>Dashboard, Match Lobby, Game Board</h2>
      </div>

      <div className="grid three">
        <Panel title="Student Dashboard">
          <div className="metric-row">
            <div><strong>#18</strong><span>Block rank</span></div>
            <div><strong>86%</strong><span>Accuracy</span></div>
          </div>
          <button className="primary">Join Quiz</button>
        </Panel>

        <Panel title="Match Lobby">
          <div className="segmented">
            <button>1v1</button>
            <button>Group</button>
            <button>Tournament</button>
          </div>
          <div className="queue-box"><strong>Queue position 12</strong></div>
        </Panel>

        <Panel title="Snakes & Ladders Quiz Match">
          <Board />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <QuestionCard dice={4} />
            <Dice value={4} />
            <Timer start={20} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

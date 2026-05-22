import React from 'react';
import Panel from '../../components/Panel';
import Board from '../../components/Board';
import QuestionCard from '../../components/QuestionCard';

export default function MatchRoomPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Live match</p>
        <h2>Match Room</h2>
      </div>

      <div className="grid two">
        <Panel>
          <Board />
          <QuestionCard />
        </Panel>

        <Panel title="Players & Chat">
          <div className="players-chat">Player list, chat and realtime indicators</div>
        </Panel>
      </div>
    </div>
  );
}

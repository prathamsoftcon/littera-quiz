import React, { useState } from 'react';
import Panel from '../../components/Panel';
import QueueTable from '../../components/QueueTable';
import ReviewDetail from '../../components/ReviewDetail';

const mock = [
  { id: 1, title: 'Fractions MCQ', teacher: 'Ms. Patel', type: 'mcq', status: 'Pending' },
  { id: 2, title: 'Audio spelling', teacher: 'Mr. Khan', type: 'media', status: 'Pending' },
];

export default function ApprovalQueuePage() {
  const [rows] = useState(mock);
  const [selected, setSelected] = useState(null);

  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Admin workflow</p>
        <h2>Approval Queue and Review Detail</h2>
      </div>

      <div className="grid two">
        <Panel>
          <QueueTable rows={rows} onSelect={setSelected} />
        </Panel>

        <Panel title={`Review Question: ${selected ? selected.title : ''}`}>
          {selected ? (
            <div>
              <div className="question-preview">
                <div className="thumbnail-box">Category thumbnail</div>
                <div>
                  <strong>{selected.title}</strong>
                  <span>Submitted by: {selected.teacher}</span>
                </div>
              </div>
              <div className="actions">
                <button>Reject</button>
                <button className="primary">Approve</button>
              </div>
            </div>
          ) : (
            <ReviewDetail />
          )}
        </Panel>
      </div>
    </div>
  );
}

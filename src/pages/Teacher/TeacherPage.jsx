import React from 'react';
import Panel from '../../components/Panel';
import QuestionForm from '../../components/QuestionForm';

export default function TeacherPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Teacher contribution and tracking</p>
        <h2>Enroll Students, Submit Questions, Monitor Performance</h2>
      </div>

      <div className="grid three">
        <Panel title="Teacher Dashboard">
          <div className="metric-row stacked">
            <div><strong>124</strong><span>Students enrolled</span></div>
            <div><strong>42</strong><span>Questions submitted</span></div>
            <div><strong>38</strong><span>Approved</span></div>
          </div>
        </Panel>

        <Panel title="Question Submission">
          <QuestionForm onSave={(q) => console.log('teacher submit', q)} />
        </Panel>

        <Panel title="Student Performance">
          <div className="chart-bars">
            <span style={{ height: '42%' }}></span>
            <span style={{ height: '75%' }}></span>
            <span style={{ height: '62%' }}></span>
          </div>
        </Panel>
      </div>
    </div>
  );
}

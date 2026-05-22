import React from 'react';
import Panel from '../../components/Panel';
import QuestionForm from '../../components/QuestionForm';

export default function QuestionEditorPage() {
  const handleSave = (q) => {
    console.log('save', q);
  };

  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Teacher contribution</p>
        <h2>Question Submission</h2>
      </div>

      <div className="grid two">
        <Panel>
          <QuestionForm onSave={handleSave} />
        </Panel>

        <Panel title={`Answer Data: MCQ`}>
          <div className="answer-panel active">
            <div className="answer-options">
              <div><span>A</span><div className="input"></div></div>
              <div><span>B</span><div className="input"></div></div>
              <div><span>C</span><div className="input"></div></div>
              <div><span>D</span><div className="input"></div></div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

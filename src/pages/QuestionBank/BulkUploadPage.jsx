import React from 'react';
import Panel from '../../components/Panel';
import UploadBox from '../../components/UploadBox';
import ValidationPreview from '../../components/ValidationPreview';

export default function BulkUploadPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Teacher and admin import</p>
        <h2>Bulk Question Upload</h2>
      </div>

      <div className="grid three">
        <Panel>
          <UploadBox />
          <button className="primary" style={{ marginTop: 12 }}>Validate File</button>
        </Panel>

        <Panel title="Validation Preview">
          <ValidationPreview />
        </Panel>

        <Panel title="Queue Submission">
          <div className="queue-box">
            <strong>Approval queue target</strong>
            <span>Valid rows become pending questions</span>
          </div>
          <button className="primary" style={{ marginTop: 12 }}>Send Valid Rows to Queue</button>
        </Panel>
      </div>
    </div>
  );
}

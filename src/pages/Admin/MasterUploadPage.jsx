import React from 'react';
import Panel from '../../components/Panel';
import MasterUpload from '../../components/MasterUpload';

export default function MasterUploadPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Master data import</p>
        <h2>Master Data Upload</h2>
      </div>

      <div className="grid one">
        <Panel>
          <MasterUpload />
        </Panel>
      </div>
    </div>
  );
}

import React from 'react';
import Panel from '../../components/Panel';

export default function MobilePreviewPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Capacitor app and rural-friendly behavior</p>
        <h2>Mobile Wireframe States</h2>
      </div>

      <div className="grid one">
        <Panel>
          <div className="phone-preview">Phone preview of app (UI, offline, native bridge)</div>
        </Panel>
      </div>

      <div className="phone-row" style={{ marginTop: 18 }}>
        <article className="phone">
          <div className="phone-top"></div>
          <h3>Quiz Alert</h3>
          <div className="notification">State tournament starts in 15 minutes</div>
          <button className="primary">Join Slot</button>
        </article>

        <article className="phone">
          <div className="phone-top"></div>
          <h3>Offline Attempt</h3>
          <div className="status-strip">7 answers saved locally</div>
          <button className="primary">Sync on Reconnect</button>
        </article>
      </div>
    </div>
  );
}

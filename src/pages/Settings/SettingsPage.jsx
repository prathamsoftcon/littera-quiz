import React from 'react';
import Panel from '../../components/Panel';

export default function SettingsPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Personalization</p>
        <h2>Settings</h2>
      </div>

      <div className="grid two">
        <Panel title="Theme & Language">
          <div>Theme toggle and language selector</div>
        </Panel>

        <Panel title="Preferences">
          <div>Notification preferences and privacy</div>
        </Panel>
      </div>
    </div>
  );
}

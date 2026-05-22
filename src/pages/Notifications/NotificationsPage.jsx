import React from 'react';
import Panel from '../../components/Panel';

export default function NotificationsPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">User notifications</p>
        <h2>Notifications & Announcements</h2>
      </div>

      <div className="grid one">
        <Panel>
          <div className="notifications-list">Notifications list and settings</div>
        </Panel>
      </div>
    </div>
  );
}

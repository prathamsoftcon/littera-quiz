import React from 'react';
import Panel from '../../components/Panel';

export default function AnalyticsPage() {
  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Admin analytics</p>
        <h2>Analytics</h2>
      </div>

      <div className="grid two">
        <Panel>
          <div className="chart-placeholder">Charts and KPIs will be shown here</div>
        </Panel>

        <Panel title="Filters">
          <div>Filter controls and export</div>
        </Panel>
      </div>
    </div>
  );
}

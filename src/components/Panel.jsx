import React, { useState } from 'react';
import Paper from '@mui/material/Paper';

export default function Panel({
  title,
  children,
  className = '',
  collapsible = false,
  defaultOpen = true,
  actions = null,
  compact = false,
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <Paper className={`panel ${compact ? 'panel-compact' : ''} ${className}`} elevation={2}>
      {title && (
        <div className="panel-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            {collapsible && (
              <button
                onClick={() => setOpen((s) => !s)}
                style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer' }}
                aria-expanded={open}
              >
                {open ? '▾' : '▸'}
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>{actions}</div>
        </div>
      )}

      {(!collapsible || open) && <div className="panel-body">{children}</div>}
    </Paper>
  );
}

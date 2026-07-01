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
        <div className="panel-title flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-bold">{title}</div>
            {collapsible && (
              <button
                onClick={() => setOpen((s) => !s)}
                className="cursor-pointer border-0 bg-transparent text-muted"
                aria-expanded={open}
              >
                {open ? '▾' : '▸'}
              </button>
            )}
          </div>
          <div className="flex gap-2">{actions}</div>
        </div>
      )}

      {(!collapsible || open) && <div className="panel-body">{children}</div>}
    </Paper>
  );
}

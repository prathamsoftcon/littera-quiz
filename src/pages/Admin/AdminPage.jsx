import React, { useState, useEffect, useMemo } from 'react';
import Panel from '../../components/Panel';
import LiveMonitoring from '../../components/LiveMonitoring';
import MasterUpload from '../../components/MasterUpload';
import QueueTable from '../../components/QueueTable';
import ReviewDetail from '../../components/ReviewDetail';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const sampleRows = [
  { id: 'q1', title: 'Image MCQ • Fractions', teacher: 'Ms. Patel', type: 'MCQ', status: 'Pending' },
  { id: 'q2', title: 'Long answer • Geography', teacher: 'Mr. Kumar', type: 'SA', status: 'Pending' },
  { id: 'q3', title: 'Fill in the blank • Science', teacher: 'Ms. Rao', type: 'FitB', status: 'Under review' },
];

export default function AdminPage() {
  const [rows, setRows] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_rows');
      return saved ? JSON.parse(saved) : sampleRows;
    } catch (e) {
      return sampleRows;
    }
  });
  const [selected, setSelected] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    try { localStorage.setItem('admin_rows', JSON.stringify(rows)); } catch (e) {}
  }, [rows]);

  function handleSelect(item) {
    setSelected(item);
  }

  function handleApprove(item) {
    if (!item) return;
    setRows((rs) => {
      const newRows = rs.map((r) => (r.id === item.id ? { ...r, status: 'Approved' } : r));
      const updated = newRows.find((r) => r.id === item.id);
      setSelected(updated);
      return newRows;
    });
    alert(`Approved: ${item?.title}`);
  }

  function handleReject(item) {
    if (!item) return;
    setRows((rs) => {
      const newRows = rs.map((r) => (r.id === item.id ? { ...r, status: 'Rejected' } : r));
      const updated = newRows.find((r) => r.id === item.id);
      setSelected(updated);
      return newRows;
    });
    alert(`Rejected: ${item?.title}`);
  }

  function handleBulkApprove() {
    if (!selectedIds || selectedIds.length === 0) {
      alert('No items selected');
      return;
    }
    setRows((rs) => rs.map((r) => (selectedIds.includes(r.id) ? { ...r, status: 'Approved' } : r)));
    alert(`Approved ${selectedIds.length} items`);
    setSelectedIds([]);
    setSelected(null);
  }

  function handleBulkReject() {
    if (!selectedIds || selectedIds.length === 0) {
      alert('No items selected');
      return;
    }
    setRows((rs) => rs.map((r) => (selectedIds.includes(r.id) ? { ...r, status: 'Rejected' } : r)));
    alert(`Rejected ${selectedIds.length} items`);
    setSelectedIds([]);
    setSelected(null);
  }

  const statusOptions = useMemo(() => ['all', 'Pending', 'Under review', 'Approved', 'Rejected'], []);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return r.title.toLowerCase().includes(q) || (r.teacher || '').toLowerCase().includes(q) || (r.type || '').toLowerCase().includes(q);
    });
  }, [rows, query, statusFilter]);

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 72px)', overflowY: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <div className="screen-heading">
          <p className="eyebrow">Operations, quality, and compliance</p>
          <h2>Admin Control Center</h2>
        </div>
      </Box>

      <LiveMonitoring />

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Panel
              title="Approval Queue"
              collapsible
              defaultOpen
              actions={
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <TextField size="small" placeholder="Search title/teacher/type" value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ endAdornment: (<IconButton size="small"><SearchIcon /></IconButton>) }} />
                  {statusOptions.map((s) => (
                    <Chip key={s} label={s} size="small" variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} />
                  ))}
                  <div style={{ position: 'relative' }}>
                    <button className="primary" onClick={() => setShowBulkMenu((s) => !s)}>Bulk action</button>
                    {showBulkMenu && (
                      <div style={{ position: 'absolute', right: 0, marginTop: 8, background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', borderRadius: 6 }}>
                        <button style={{ display: 'block', padding: '8px 12px', width: 160, textAlign: 'left' }} onClick={() => { handleBulkApprove(); setShowBulkMenu(false); }}>
                          Approve selected
                        </button>
                        <button style={{ display: 'block', padding: '8px 12px', width: 160, textAlign: 'left' }} onClick={() => { handleBulkReject(); setShowBulkMenu(false); }}>
                          Reject selected
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              }
            >
              <QueueTable rows={filteredRows} onSelect={handleSelect} selectable selectedIds={selectedIds} onSelectionChange={setSelectedIds} />
              <div style={{ marginTop: 8 }}>
                <ReviewDetail item={selected} onApprove={() => handleApprove(selected)} onReject={() => handleReject(selected)} />
              </div>
            </Panel>
          </Grid>

          <Grid item xs={12}>
            <Panel title="Master Upload" compact actions={<button className="primary">Template</button>}>
              <MasterUpload onImport={() => alert('Import triggered')} />
            </Panel>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

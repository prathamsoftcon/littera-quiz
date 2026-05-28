// import React, { useState, useEffect, useMemo } from 'react';
// import Panel from '../../components/Panel';
// import LiveMonitoring from '../../features/admin/LiveMonitoring';
// import MasterUpload from '../../features/admin/MasterUpload';
// import QueueTable from '../../components/QueueTable';
// import ReviewDetail from '../../features/question-bank/ReviewDetail';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import Chip from '@mui/material/Chip';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';

// const sampleRows = [
//   { id: 'q1', title: 'Image MCQ • Fractions', teacher: 'Ms. Patel', type: 'MCQ', status: 'Pending' },
//   { id: 'q2', title: 'Long answer • Geography', teacher: 'Mr. Kumar', type: 'SA', status: 'Pending' },
//   { id: 'q3', title: 'Fill in the blank • Science', teacher: 'Ms. Rao', type: 'FitB', status: 'Under review' },
// ];

// export default function AdminPage() {
//   const [rows, setRows] = useState(() => {
//     try {
//       const saved = localStorage.getItem('admin_rows');
//       return saved ? JSON.parse(saved) : sampleRows;
//     } catch (e) {
//       return sampleRows;
//     }
//   });
//   const [selected, setSelected] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [showBulkMenu, setShowBulkMenu] = useState(false);
//   const [query, setQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     try { localStorage.setItem('admin_rows', JSON.stringify(rows)); } catch (e) {}
//   }, [rows]);

//   function handleSelect(item) {
//     setSelected(item);
//   }

//   function handleApprove(item) {
//     if (!item) return;
//     setRows((rs) => {
//       const newRows = rs.map((r) => (r.id === item.id ? { ...r, status: 'Approved' } : r));
//       const updated = newRows.find((r) => r.id === item.id);
//       setSelected(updated);
//       return newRows;
//     });
//     alert(`Approved: ${item?.title}`);
//   }

//   function handleReject(item) {
//     if (!item) return;
//     setRows((rs) => {
//       const newRows = rs.map((r) => (r.id === item.id ? { ...r, status: 'Rejected' } : r));
//       const updated = newRows.find((r) => r.id === item.id);
//       setSelected(updated);
//       return newRows;
//     });
//     alert(`Rejected: ${item?.title}`);
//   }

//   function handleBulkApprove() {
//     if (!selectedIds || selectedIds.length === 0) {
//       alert('No items selected');
//       return;
//     }
//     setRows((rs) => rs.map((r) => (selectedIds.includes(r.id) ? { ...r, status: 'Approved' } : r)));
//     alert(`Approved ${selectedIds.length} items`);
//     setSelectedIds([]);
//     setSelected(null);
//   }

//   function handleBulkReject() {
//     if (!selectedIds || selectedIds.length === 0) {
//       alert('No items selected');
//       return;
//     }
//     setRows((rs) => rs.map((r) => (selectedIds.includes(r.id) ? { ...r, status: 'Rejected' } : r)));
//     alert(`Rejected ${selectedIds.length} items`);
//     setSelectedIds([]);
//     setSelected(null);
//   }

//   const statusOptions = useMemo(() => ['all', 'Pending', 'Under review', 'Approved', 'Rejected'], []);

//   const filteredRows = useMemo(() => {
//     return rows.filter((r) => {
//       if (statusFilter !== 'all' && r.status !== statusFilter) return false;
//       if (!query) return true;
//       const q = query.toLowerCase();
//       return r.title.toLowerCase().includes(q) || (r.teacher || '').toLowerCase().includes(q) || (r.type || '').toLowerCase().includes(q);
//     });
//   }, [rows, query, statusFilter]);

//   return (
//     <Box sx={{ p: 3, height: 'calc(100vh - 72px)', overflowY: 'auto' }}>
//       <Box sx={{ mb: 3 }}>
//         <div className="screen-heading">
//           <p className="eyebrow">Operations, quality, and compliance</p>
//           <h2>Admin Control Center</h2>
//         </div>
//       </Box>

//       <LiveMonitoring />

//       <Box sx={{ mt: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Panel
//               title="Approval Queue"
//               collapsible
//               defaultOpen
//               actions={
//                 <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
//                   <TextField size="small" placeholder="Search title/teacher/type" value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ endAdornment: (<IconButton size="small"><SearchIcon /></IconButton>) }} />
//                   {statusOptions.map((s) => (
//                     <Chip key={s} label={s} size="small" variant={statusFilter === s ? 'filled' : 'outlined'} onClick={() => setStatusFilter(s)} />
//                   ))}
//                   <div style={{ position: 'relative' }}>
//                     <button className="primary" onClick={() => setShowBulkMenu((s) => !s)}>Bulk action</button>
//                     {showBulkMenu && (
//                       <div style={{ position: 'absolute', right: 0, marginTop: 8, background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', borderRadius: 6 }}>
//                         <button style={{ display: 'block', padding: '8px 12px', width: 160, textAlign: 'left' }} onClick={() => { handleBulkApprove(); setShowBulkMenu(false); }}>
//                           Approve selected
//                         </button>
//                         <button style={{ display: 'block', padding: '8px 12px', width: 160, textAlign: 'left' }} onClick={() => { handleBulkReject(); setShowBulkMenu(false); }}>
//                           Reject selected
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               }
//             >
//               <QueueTable rows={filteredRows} onSelect={handleSelect} selectable selectedIds={selectedIds} onSelectionChange={setSelectedIds} />
//               <div style={{ marginTop: 8 }}>
//                 <ReviewDetail item={selected} onApprove={() => handleApprove(selected)} onReject={() => handleReject(selected)} />
//               </div>
//             </Panel>
//           </Grid>

//           <Grid item xs={12}>
//             <Panel title="Master Upload" compact actions={<button className="primary">Template</button>}>
//               <MasterUpload onImport={() => alert('Import triggered')} />
//             </Panel>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }




import React from 'react';

export default function StudentPage() {
  return (
    <div
      className="screen"
      style={{
        minHeight: '70vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.22), transparent 34%), radial-gradient(circle at 80% 16%, rgba(37, 99, 235, 0.22), transparent 36%), linear-gradient(160deg, #f8fbff 0%, #eef6ff 100%)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          margin: '0 auto',
          padding: '42px 28px',
          borderRadius: 16,
          border: '1px solid #bfdbfe',
          background: 'rgba(255, 255, 255, 0.86)',
          boxShadow: '0 24px 50px rgba(30, 64, 175, 0.12)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 999,
            background: '#dbeafe',
            border: '1px solid #93c5fd',
            color: '#1e40af',
            fontWeight: 700,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 0.6,
            animation: 'pulseBadge 1.8s ease-in-out infinite',
          }}
        >
          Admin Module
        </span>

        <h2
          style={{
            margin: '16px 0 10px',
            color: '#0f172a',
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.08,
          }}
        >
          Coming Soon
        </h2>

        <p
          style={{
            margin: 0,
            color: '#334155',
            fontSize: 16,
          }}
        >
          We are crafting a better admin experience. Stay tuned for the launch.
        </p>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', gap: 8 }}>
          <span className="cs-dot" style={{ animationDelay: '0s' }} />
          <span className="cs-dot" style={{ animationDelay: '0.2s' }} />
          <span className="cs-dot" style={{ animationDelay: '0.4s' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 16,
            pointerEvents: 'none',
            border: '1px solid rgba(125, 211, 252, 0.45)',
            animation: 'glowFrame 2.6s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pulseBadge {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.25); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
        }

        @keyframes bounceDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        @keyframes glowFrame {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }

        .cs-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          display: inline-block;
          animation: bounceDot 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

import React, { useState } from 'react';
import Panel from '../../components/Panel';
import LiveMonitoring from '../../components/LiveMonitoring';
import MasterUpload from '../../components/MasterUpload';
import QueueTable from '../../components/QueueTable';
import ReviewDetail from '../../components/ReviewDetail';

const sampleRows = [
  { id: 'q1', title: 'Image MCQ • Fractions', teacher: 'Ms. Patel', type: 'MCQ', status: 'Pending' },
  { id: 'q2', title: 'Long answer • Geography', teacher: 'Mr. Kumar', type: 'SA', status: 'Pending' },
  { id: 'q3', title: 'Fill in the blank • Science', teacher: 'Ms. Rao', type: 'FitB', status: 'Under review' },
];

export default function AdminPage() {
  const [rows, setRows] = useState(sampleRows);
  const [selected, setSelected] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkMenu, setShowBulkMenu] = useState(false);

  function handleSelect(item) {
    setSelected(item);
  }

  function handleApprove(item) {
    if (!item) return;
    setRows((rs) => rs.map((r) => (r.id === item.id ? { ...r, status: 'Approved' } : r)));
    alert(`Approved: ${item?.title}`);
  }

  function handleReject(item) {
    if (!item) return;
    setRows((rs) => rs.map((r) => (r.id === item.id ? { ...r, status: 'Rejected' } : r)));
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

  return (
    <div className="screen">
      <div className="screen-heading">
        <p className="eyebrow">Operations, quality, and compliance</p>
        <h2>Admin Control Center</h2>
      </div>

      <div style={{ marginBottom: 16 }}>
        <LiveMonitoring />
      </div>

      <div className="grid two">
        <Panel
          title="Approval Queue"
          collapsible
          defaultOpen
          actions={
            <div style={{ position: 'relative' }}>
              <button className="primary" onClick={() => setShowBulkMenu((s) => !s)}>
                Bulk action
              </button>
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
          }
        >
          <QueueTable rows={rows} onSelect={handleSelect} selectable selectedIds={selectedIds} onSelectionChange={setSelectedIds} />
          <div style={{ marginTop: 8 }}>
            <ReviewDetail item={selected} onApprove={() => handleApprove(selected)} onReject={() => handleReject(selected)} />
          </div>
        </Panel>

        <Panel title="Master Upload" compact actions={<button className="primary">Template</button>}>
          <MasterUpload onImport={() => alert('Import triggered')} />
        </Panel>
      </div>
    </div>
  );
}

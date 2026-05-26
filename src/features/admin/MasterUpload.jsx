import React, { useState } from 'react';
import UploadBox from '../../features/question-bank/UploadBox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function MasterUpload({ onImport }) {
  const [file, setFile] = useState(null);
  const [previewLines, setPreviewLines] = useState(null);
  const expectedFields = ['school_code', 'school_name', 'school_type', 'block', 'district'];
  const [detectedColumns, setDetectedColumns] = useState([]);
  const [mapping, setMapping] = useState({});
  const [templates, setTemplates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('master_upload_templates') || '[]'); } catch (e) { return []; }
  });
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [fieldsIncluded, setFieldsIncluded] = useState(() => expectedFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));

  function handleFile(f) {
    setFile(f);
    if (!f) {
      setPreviewLines(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result || '';
      const lines = text.split(/\r?\n/).filter(Boolean);
      setPreviewLines(lines.slice(0, 6));
      detectHeader(text);
    };
    reader.readAsText(f);
  }

  function detectHeader(text) {
    const firstLine = (text || '').split(/\r?\n/).find(Boolean) || '';
    const cols = firstLine.split(',').map((c) => c.trim());
    setDetectedColumns(cols);
    const init = {};
    expectedFields.forEach((ef) => { init[ef] = cols.includes(ef) ? ef : ''; });
    setMapping(init);
  }

  function downloadTemplate() {
    const cols = expectedFields.filter((f) => fieldsIncluded[f]);
    const header = cols.join(',') + '\n';
    const sample = cols.map((c, i) => `VAL${i + 1}`).join(',') + '\n';
    const csv = header + sample;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'master_upload_template.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    if (!file) {
      alert('Please choose a file to import');
      return;
    }
    const payload = { file, mapping };
    onImport && onImport(payload);
  }

  return (
    <Paper sx={{ p: 2 }} elevation={2}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 1, p: 1.25, display: 'flex', alignItems: 'center', gap: 1.25, width: '100%' }}>
          <CloudUploadIcon sx={{ fontSize: 36, color: 'action.active' }} />
          <Box sx={{ flex: 1 }}>
            <UploadBox onFile={handleFile} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: '100%', mt: 0.75 }}>
        <Box sx={{ background: '#fafafa', p: 1, borderRadius: 1, minHeight: 120 }}>
            {file ? (
            <Box>
                <Typography sx={{ fontWeight: 700 }}>{file.name}</Typography>
                <Box sx={{ mt: 0.75, color: 'text.secondary' }}>
                  {previewLines ? (
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>Preview (first lines):</Typography>
                      <Box sx={{ p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: 12 }}>
                        {previewLines.map((l, i) => (<div key={i}>{l}</div>))}
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body2">Reading file preview...</Typography>
                  )}
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">Column mapping</Typography>
                  {detectedColumns.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {expectedFields.map((ef) => (
                        <FormControl key={ef} size="small" sx={{ minWidth: 160 }}>
                          <InputLabel>{ef}</InputLabel>
                          <Select
                            value={mapping[ef] || ''}
                            label={ef}
                            onChange={(e) => setMapping((m) => ({ ...m, [ef]: e.target.value }))}
                          >
                            <MenuItem value="">-- none --</MenuItem>
                            {detectedColumns.map((dc) => (<MenuItem key={dc} value={dc}>{dc}</MenuItem>))}
                          </Select>
                        </FormControl>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2">No columns detected yet.</Typography>
                  )}

                  <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Templates</InputLabel>
                      <Select value={selectedTemplate} label="Templates" onChange={(e) => setSelectedTemplate(e.target.value)}>
                        <MenuItem value="">-- none --</MenuItem>
                        {templates.map((t) => (<MenuItem key={t.name} value={t.name}>{t.name}</MenuItem>))}
                      </Select>
                    </FormControl>
                    <Button size="small" onClick={() => {
                      if (!selectedTemplate) return;
                      const t = templates.find((x) => x.name === selectedTemplate);
                      if (t) { setMapping(t.mapping || {}); setFieldsIncluded(t.fieldsIncluded || {}); }
                    }}>Load template</Button>
                    <Button size="small" onClick={() => {
                      const name = prompt('Template name');
                      if (!name) return;
                      const t = { name, mapping, fieldsIncluded };
                      const next = [...templates.filter((x) => x.name !== name), t];
                      setTemplates(next);
                      localStorage.setItem('master_upload_templates', JSON.stringify(next));
                      setSelectedTemplate(name);
                    }}>Save template</Button>
                    <Button size="small" color="error" onClick={() => {
                      if (!selectedTemplate) return;
                      const next = templates.filter((x) => x.name !== selectedTemplate);
                      setTemplates(next);
                      localStorage.setItem('master_upload_templates', JSON.stringify(next));
                      setSelectedTemplate('');
                    }}>Delete</Button>
                  </Box>

                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {expectedFields.map((f) => (
                      <FormControlLabel key={f} control={<Checkbox checked={!!fieldsIncluded[f]} onChange={(e) => setFieldsIncluded((s) => ({ ...s, [f]: e.target.checked }))} />} label={`Include ${f}`} />
                    ))}
                  </Box>
                </Box>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">CSV mapping and preview for master data import</Typography>
          )}
        </Box>

          <Typography variant="h6" sx={{ mt: 0.75 }}>Master Data Upload</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>Download the template, map and validate before importing.</Typography>

        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outlined" onClick={downloadTemplate}>Download template</Button>
          <Button variant="contained" onClick={handleImport}>Validate & Import</Button>
        </Box>
      </Box>
    </Paper>
  );
}

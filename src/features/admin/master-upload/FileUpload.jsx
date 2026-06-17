import React, { useState } from 'react';
import UploadBox from '../../question-bank/UploadBox';
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
        <Box sx={{ background: '#fafafa', p: 2, borderRadius: 1 }}>
            {file ? (
                <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Uploaded File Information
                </Typography>

                <Box
                    sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    p: 1.5,
                    mb: 2,
                    bgcolor: '#fff'
                    }}
                >
                    <Typography sx={{ fontWeight: 600 }}>
                    {file.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                    {(file.size / 1024).toFixed(0)} KB - {file.name.split('.').pop().toUpperCase()}
                    {previewLines && ` - ${previewLines.length} rows detected`}
                    </Typography>
                </Box>

                {!['csv', 'xlsx'].includes(
                    file.name.split('.').pop().toLowerCase()
                ) && (
                    <Box
                    sx={{
                        border: '1px solid #f44336',
                        bgcolor: '#ffebee',
                        borderRadius: 1,
                        p: 1.5
                    }}
                    >
                    <Typography
                        variant="subtitle2"
                        sx={{ color: '#d32f2f', fontWeight: 600 }}
                    >
                        Unsupported File Type Error
                    </Typography>

                    <Typography variant="body2" color="error">
                        {file.name} is not supported
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        Use this inline error when file extension is not CSV or XLSX.
                    </Typography>
                    </Box>
                )}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                CSV mapping and preview for master data import
                </Typography>
            )}
        </Box>

          {/* <Typography variant="h6" sx={{ mt: 0.75 }}>Master Data Upload</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>Download the template, map and validate before importing.</Typography>

        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outlined" onClick={downloadTemplate}>Download template</Button>
          <Button variant="contained" onClick={handleImport}>Validate & Import</Button>
        </Box> */}
       
      </Box>
    </Paper>
  );
}

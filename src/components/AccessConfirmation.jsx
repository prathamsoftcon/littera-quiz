import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import locations from '../data/locations';

export default function AccessConfirmation({ onContinue, role = 'student' }) {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [error, setError] = useState('');

  const stateOptions = locations;
  const districtOptions = selectedState ? (locations.find(s => s.key === selectedState)?.districts || []) : [];
  const blockOptions = selectedDistrict ? (districtOptions.find(d => d.key === selectedDistrict)?.blocks || []) : [];
  const villageOptions = selectedBlock ? (blockOptions.find(b => b.key === selectedBlock)?.villages || []) : [];

  const handleContinue = () => {
    setError('');
    if (!selectedDistrict) {
      setError('Please select a district');
      return;
    }

    const payload = {
      location: {
        state: selectedState || null,
        district: selectedDistrict || null,
        block: selectedBlock || null,
        village: selectedVillage || null
      }
    };
    if (onContinue) onContinue(payload);
    navigate('/teacher');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 520, mx: 'auto', transform: 'translateY(-20px)' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Access Confirmation</Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              value={selectedState}
              label="State"
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
                setSelectedBlock('');
                setSelectedVillage('');
              }}
            >
              {stateOptions.map(s => (
                <MenuItem key={s.key} value={s.key}>{s.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!selectedState}>
            <InputLabel id="district-label">District</InputLabel>
            <Select
              labelId="district-label"
              value={selectedDistrict}
              label="District"
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedBlock('');
                setSelectedVillage('');
              }}
            >
              {districtOptions.map(d => (
                <MenuItem key={d.key} value={d.key}>{d.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!selectedDistrict}>
            <InputLabel id="block-label">Block</InputLabel>
            <Select
              labelId="block-label"
              value={selectedBlock}
              label="Block"
              onChange={(e) => {
                setSelectedBlock(e.target.value);
                setSelectedVillage('');
              }}
            >
              {blockOptions.map(b => (
                <MenuItem key={b.key} value={b.key}>{b.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={!selectedBlock}>
            <InputLabel id="village-label">Village</InputLabel>
            <Select
              labelId="village-label"
              value={selectedVillage}
              label="Village"
              onChange={(e) => setSelectedVillage(e.target.value)}
            >
              {villageOptions.map(v => (
                <MenuItem key={v.key} value={v.key}>{v.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" fullWidth disabled={!selectedDistrict} onClick={handleContinue}>
            Go to Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

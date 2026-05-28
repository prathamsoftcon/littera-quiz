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
import { useTranslation } from '../context/TranslationContext';

export default function AccessConfirmation({ onContinue, role = 'student' }) {
  const { t } = useTranslation();
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
      setError(t('pleaseSelectDistrict'));
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
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, borderRadius: 3 }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 520, mx: 'auto', transform: 'translateY(-20px)' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{t('accessConfirmation')}</Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="state-label">{t('state')}</InputLabel>
            <Select
              labelId="state-label"
              value={selectedState}
              label={t('state')}
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
            <InputLabel id="district-label">{t('district')}</InputLabel>
            <Select
              labelId="district-label"
              value={selectedDistrict}
              label={t('district')}
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
            <InputLabel id="block-label">{t('block')}</InputLabel>
            <Select
              labelId="block-label"
              value={selectedBlock}
              label={t('block')}
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
            <InputLabel id="village-label">{t('village')}</InputLabel>
            <Select
              labelId="village-label"
              value={selectedVillage}
              label={t('village')}
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
            {t('goToDashboard')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

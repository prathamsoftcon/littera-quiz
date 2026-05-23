import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MapIcon from '@mui/icons-material/Map';
import LocationCityIcon from '@mui/icons-material/LocationCity';

export default function AccessConfirmation({ summary, onContinue, role = 'teacher' }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const options = [
    { key: 'village', label: 'Village', icon: <HomeWorkIcon /> },
    { key: 'crc', label: 'CRC', icon: <AccountTreeIcon /> },
    { key: 'block', label: 'Block', icon: <MapIcon /> },
    { key: 'district', label: 'District', icon: <LocationCityIcon /> },
  ];

  const handleContinue = () => {
    if (onContinue) onContinue(selected);
    if (role === 'teacher') navigate('/teacher');
    else navigate('/student');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 520, mx: 'auto', transform: 'translateY(-20px)' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Confirm access level</Typography>

        <Stack spacing={1} sx={{ mt: 2 }}>
          {options.map((o) => (
            <Box
              key={o.key}
              onClick={() => setSelected(o.key)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                borderRadius: 1,
                cursor: 'pointer',
                border: selected === o.key ? '1px solid' : '1px solid transparent',
                borderColor: selected === o.key ? 'primary.main' : 'transparent',
                bgcolor: selected === o.key ? 'rgba(15,118,110,0.06)' : 'background.paper',
                transition: 'all 150ms ease'
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'grey.100' }}>
                {o.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{o.label}</Typography>
                <Typography variant="caption" color="text.secondary">{o.key === 'crc' ? 'Cluster Resource Center' : 'Select this area'}</Typography>
              </Box>

              {selected === o.key && (
                <Typography sx={{ color: 'primary.main', fontWeight: 600 }}>Selected</Typography>
              )}
            </Box>
          ))}
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" fullWidth disabled={!selected} onClick={handleContinue}>
            Go to Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

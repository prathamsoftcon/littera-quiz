import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function LiveMonitoring({ stats = { players: 12480, slots: 327, violations: 41 } }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ flex: 1, minWidth: 220, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, minHeight: 280, bgcolor: '#cde6ff' }} elevation={1}>
          <PeopleIcon sx={{ fontSize: 64, color: 'primary.main' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>{stats.players}</Typography>
            <Typography variant="body2" color="text.secondary">Live players</Typography>
          </Box>
        </Paper>

        <Paper sx={{ flex: 1, minWidth: 220, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, minHeight: 280, bgcolor: '#cfeee0' }} elevation={1}>
          <EventAvailableIcon sx={{ fontSize: 64, color: 'success.main' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>{stats.slots}</Typography>
            <Typography variant="body2" color="text.secondary">Slots active</Typography>
          </Box>
        </Paper>

        <Paper sx={{ flex: 1, minWidth: 220, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, minHeight: 280, bgcolor: '#ffdcbc' }} elevation={1}>
          <WarningAmberIcon sx={{ fontSize: 64, color: 'warning.main' }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>{stats.violations}</Typography>
            <Typography variant="body2" color="text.secondary">Violations logged</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

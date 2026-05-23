import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function RoleRouting({ detectedRole, profileComplete, onSelect }) {
  const roles = [
    { id: 'student', label: 'Student', icon: <SchoolIcon /> },
    { id: 'teacher', label: 'Teacher', icon: <MenuBookIcon /> },
    { id: 'admin', label: 'Admin', icon: <AdminPanelSettingsIcon /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, transform: 'translateY(-30px)' }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 360, mx: 'auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Choose Role</Typography>

        <Stack spacing={1}>
          {roles.map((r) => (
            <Button
              key={r.id}
              variant="outlined"
              onClick={() => onSelect && onSelect(r.id)}
              fullWidth
              startIcon={(
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}>
                  {r.icon}
                </Box>
              )}
            >
              {r.label}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

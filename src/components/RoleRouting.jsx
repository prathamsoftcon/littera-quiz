import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function RoleRouting({ detectedRole, profileComplete, onSelect }) {
  const [selectedRole, setSelectedRole] = useState(detectedRole || '');

  useEffect(() => {
    if (detectedRole) {
      setSelectedRole(detectedRole);
    }
  }, [detectedRole]);

  const roles = [
    {
      id: 'student',
      label: 'Student',
      icon: <SchoolIcon />,
    },
    {
      id: 'teacher',
      label: 'Teacher',
      icon: <MenuBookIcon />,
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: <AdminPanelSettingsIcon />,
    },
  ];

  const selectedLabel = useMemo(() => {
    const found = roles.find((r) => r.id === selectedRole);
    return found ? found.label : '';
  }, [roles, selectedRole]);

  const handleContinue = () => {
    if (!selectedRole) {
      return;
    }
    if (onSelect) {
      onSelect(selectedRole);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, transform: 'translateY(-30px)', borderRadius: 3 }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 460, mx: 'auto', borderRadius: 3 }}>
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Choose Role</Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
          {detectedRole && (
            <Chip
              label={`Detected role: ${detectedRole}`}
              color="primary"
              variant="outlined"
              sx={{ width: 'fit-content' }}
            />
          )}
        </Stack>

        <Stack spacing={1.25}>
          {roles.map((r) => (
            <Button
              key={r.id}
              variant={selectedRole === r.id ? 'contained' : 'outlined'}
              color={selectedRole === r.id ? 'primary' : 'inherit'}
              onClick={() => setSelectedRole(r.id)}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.25,
                borderRadius: 2,
                borderColor: selectedRole === r.id ? 'primary.main' : 'divider',
              }}
              startIcon={(
                <Box sx={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: selectedRole === r.id ? 'rgba(255,255,255,0.2)' : 'grey.100' }}>
                  {r.icon}
                </Box>
              )}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {r.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    opacity: selectedRole === r.id ? 0.92 : 0.75,
                    color: selectedRole === r.id ? 'inherit' : 'text.secondary',
                  }}
                >
                  {r.subtitle}
                </Typography>
              </Box>
            </Button>
          ))}
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {selectedRole
              ? `${selectedLabel} selected${profileComplete ? ' - profile complete' : ''}`
              : 'Select one role to continue'}
          </Typography>
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!selectedRole}
            fullWidth
          >
            Continue
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

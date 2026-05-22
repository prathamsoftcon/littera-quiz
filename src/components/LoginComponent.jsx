import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginComponent({ onSendOTP, onSocial, fullPage = false }) {
  const [mobile, setMobile] = useState('');
  const [method, setMethod] = useState('otp');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!mobile || mobile.length !== 10) return alert('Enter a valid 10-digit mobile number');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSendOTP && onSendOTP(mobile);
    }, 700);
  };

  const handleGoogle = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return alert('Enter a valid email for Google sign-in');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSocial && onSocial('google', { email });
    }, 700);
  };

  const content = (
    <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Stack spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: 'primary.main' }}>L</Avatar>
        <Typography variant="h6">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">Use OTP or Google to continue</Typography>
      </Stack>

      <Box sx={{ mt: 2 }}>
        <ToggleButtonGroup
          value={method}
          exclusive
          onChange={(_, val) => val && setMethod(val)}
          aria-label="auth-method"
          size="small"
        >
          <ToggleButton value="otp">OTP</ToggleButton>
          <ToggleButton value="google">Google</ToggleButton>
        </ToggleButtonGroup>

        <Box className="mt-4">
          {method === 'otp' ? (
            <Stack spacing={2}>
              <TextField
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter mobile"
                variant="outlined"
                size="small"
                inputProps={{ maxLength: 10, inputMode: 'numeric' }}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleSendOTP} disabled={loading} fullWidth>
                {loading ? 'Sending…' : 'Send OTP'}
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="name@example.com"
                variant="outlined"
                size="small"
                type="email"
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleGoogle} disabled={loading} fullWidth startIcon={<GoogleIcon />}>
                {loading ? 'Signing…' : 'Sign in with Google'}
              </Button>
            </Stack>
          )}
        </Box>

        <Divider className="my-4" />

        <Typography variant="caption" color="text.secondary">By continuing you agree to the terms and privacy policy.</Typography>
      </Box>
    </Paper>
  );

  if (fullPage) {
    return (
      <Box className="min-h-screen flex items-center justify-center p-4">
        {content}
      </Box>
    );
  }

  return content;
}

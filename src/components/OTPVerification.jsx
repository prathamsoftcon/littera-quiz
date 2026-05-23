import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function OTPVerification({ phone, onVerify, onResend }) {
  const [otp, setOtp] = useState('');

  const card = (
    <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 520, mx: 'auto', transform: 'translateY(-20px)' }}>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Verify OTP</Typography>
        <Typography variant="body2" color="text.secondary">Enter the 6-digit code sent to your phone to continue.</Typography>

        <Typography variant="body2" color="text.secondary">
          OTP sent to <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{phone || '+91 XXXXX XXXXX'}</Typography>
        </Typography>

        <TextField
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter OTP"
          inputProps={{ maxLength: 6, inputMode: 'numeric' }}
          fullWidth
        />

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => otp.length === 6 && onVerify && onVerify(otp)}
            disabled={otp.length !== 6}
            fullWidth
          >
            Verify and Continue
          </Button>

          <Button variant="text" sx={{ mt: 1 }} onClick={() => onResend && onResend()} fullWidth>
            Resend OTP
          </Button>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, transform: 'translateY(-40px)' }}>
      {card}
    </Box>
  );
}

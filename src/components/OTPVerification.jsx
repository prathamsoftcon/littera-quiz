import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OTPBox from './OTPBoxes';
import { useTranslation } from '../context/TranslationContext';

export default function OTPVerification({ phone, onVerify, onResend }) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');

  const card = (
    <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 520, mx: 'auto', transform: 'translateY(-20px)', borderRadius: 3 }}>
      <Stack spacing={1.5}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{t('verifyOtp')}</Typography>
        <Typography variant="body2" color="text.secondary">{t('enterOtpInstruction')}</Typography>

        <Typography variant="body2" color="text.secondary">
          {t('otpSentTo')} <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{phone || '+91 XXXXX XXXXX'}</Typography>
        </Typography>

        {/* <TextField
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter OTP"
          inputProps={{ maxLength: 6, inputMode: 'numeric' }}
          fullWidth
        /> */}
        <OTPBox value={otp} onChange={setOtp} rowAriaLabel={t('otpBoxes')} digitAriaLabel={t('otpDigit')} />

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => otp.length === 6 && onVerify && onVerify(otp)}
            disabled={otp.length !== 6}
            fullWidth
          >
            {t('verifyAndContinue')}
          </Button>

          <Button variant="text" sx={{ mt: 1 }} onClick={() => onResend && onResend()} fullWidth>
            {t('resendOtp')}
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

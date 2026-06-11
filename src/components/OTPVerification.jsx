import React, { useEffect, useState } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(120);
  const [otpDisabled, setOtpDisabled] = useState(false);

  useEffect(() => {
    setTimeLeft(120);
  }, [phone]);

  useEffect(() => {
    if (timeLeft <= 0) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
  if (timeLeft <= 0) {
    setOtp('');
    setOtpDisabled(true);
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  function handleResend() {
    if (timeLeft > 0) return;

    setOtp('');
    setOtpDisabled(false);

    onResend && onResend();
    setTimeLeft(120);
  }

  useEffect(() => {
    setTimeLeft(120);
    setOtp('');
    setOtpDisabled(false);
  }, [phone]);

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
        <OTPBox value={otp} onChange={setOtp} disabled={otpDisabled} rowAriaLabel={t('otpBoxes')} digitAriaLabel={t('otpDigit')} />

        <Typography variant="caption" color={timeLeft === 0 ? 'success.main' : 'text.secondary'}>
          {timeLeft === 0 ? 'You can now resend OTP.' : `Resend available in ${minutes}:${seconds}`}
        </Typography>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => otp.length === 6 && onVerify && onVerify(otp)}
            disabled={otp.length !== 6 || otpDisabled}
            fullWidth
          >
            {t('verifyAndContinue')}
          </Button>

          <Button
            variant="text"
            sx={{ mt: 1 }}
            onClick={handleResend}
            disabled={timeLeft > 0}
            fullWidth
          >
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

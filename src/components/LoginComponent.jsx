import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// use project asset from src/assets
import logo from '../assets/littera_logo.png';
import { useTranslation } from '../context/TranslationContext';
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginComponent({ onSendOTP, onSocial, fullPage = false }) {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(true);

  const handleSendOTP = () => {
    if (!mobile || mobile.length !== 10) return alert(t('enterValidMobile'));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSendOTP && onSendOTP(mobile);
    }, 700);
  };

  const handleSocialClick = (provider) => {
    const providerLabel = provider === 'google' ? 'Google' : 'Microsoft';
    const email = window.prompt(t('enterProviderEmail').replace('{provider}', providerLabel));
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSocial && onSocial(provider, { email });
    }, 600);
  };

  const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      setLoading(true);

      const loginData = {
        provider: "google",
        accesstoken: tokenResponse.access_token,
      };

      await loginUser(loginData);

      toast.success("Google Login Successful!");
    } catch (error) {
      console.error("Google Login Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Google Login Failed"
      );
    } finally {
      setLoading(false);
    }
  },

  onError: () => {
    toast.error("Google Login Failed");
  },
});

  const loginUser = async (loginData) => {
  const headers = {
    "Content-Type": "application/json",
    APIKey: import.meta.env.VITE_REACT_APP_API_KEY,
  };

  const response = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/GetToken`,
    loginData,
    { headers }
  );

  setUser(response.data.result);
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.result)
  );

  const shouldOpenModal =
    response.data.result.userdetails.usertype.length > 1;

  const userTypeId =
    selectedUserType ||
    response.data.result.userdetails.usertype[0]?.usertypeid;

  if (userTypeId == "4") {
    navigate("/dashboard");
    toast.success("Login successful!");
  } else {
    if (!shouldOpenModal) {
      setSelectedUserType(userTypeId);
      setIsOpenModal(true);
    } else {
      setIsOpen(true);
      setIsOpenModal(true);
    }
  }

  return response;
};

const handleOTPLogin = async () => {
  try {
    const loginData = {
      otp,
      ...(loginType === "emailid"
        ? { emailid: username }
        : { mobileno: `91-${username}` }),
    };

    await loginUser(loginData);
  } catch (error) {
    console.error(error);
  }
};

  const GoogleMulti = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.15 1.36 7.56 2.5l5.06-5.06C34.24 4.07 29.5 2 24 2 14.78 2 6.99 7.3 3.59 15.03l6.69 5.19C11.96 12.9 17.44 9.5 24 9.5z" />
      <path fill="#34A853" d="M46.5 24c0-1.49-.14-2.61-.39-3.74H24v7.09h12.98c-.56 3.08-3.12 6.07-8.03 7.87l6.16 4.77C42.25 38.6 46.5 31.86 46.5 24z" />
      <path fill="#FBBC05" d="M10.28 29.22A14.95 14.95 0 0 1 9 24c0-1.6.27-3.15.78-4.62L3.1 14.2C1.14 17.85 0 21.81 0 26c0 4.19 1.14 8.15 3.1 11.8l7.18-8.58z" />
      <path fill="#EA4335" d="M24 46c6.5 0 11.96-2.15 15.9-5.85l-7.6-5.89C30.05 34.64 27.01 35.5 24 35.5 17.44 35.5 11.96 32.1 7.79 26.8l-7.18 8.58C6.99 40.7 14.78 46 24 46z" />
    </svg>
  );

  const MicrosoftMulti = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="3" width="8" height="8" fill="#F35325" />
      <rect x="13" y="3" width="8" height="8" fill="#81BC06" />
      <rect x="3" y="13" width="8" height="8" fill="#05A6F0" />
      <rect x="13" y="13" width="8" height="8" fill="#FFD806" />
    </svg>
  );

  const card = (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2.5, sm: 4 },
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
        borderRadius: { xs: 2.5, sm: 3 },
      }}
    >
      <Stack spacing={2} alignItems="center">
        {showImage ? (
          <Box component="img" src={logo} alt="Littera Logo" sx={{ width: 72, height: 72, objectFit: 'contain' }} onError={(e) => { setShowImage(false); }} />
        ) : (
          <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72 }}>L</Avatar>
        )}
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Littera Quiz</Typography>
        <Typography variant="body2" color="text.secondary">{t('enterMobileToStart')}</Typography>
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{t('mobileNumberLabel')}</Typography>
        <TextField
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder={t('mobilePlaceholder')}
          variant="outlined"
          size="small"
          inputProps={{ maxLength: 10, inputMode: 'numeric' }}
          fullWidth
          sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: 'background.paper' } }}
        />

        <Button variant="contained" color="primary" onClick={handleSendOTP} disabled={loading} fullWidth sx={{ mt: 2 }}>
          {loading ? t('sending') : t('login')}
        </Button>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 2 }}>{t('orContinueWith')}</Typography>

        <Stack spacing={1}>
          {/* <Button
            variant="outlined"
            startIcon={<GoogleMulti />}
            onClick={() => handleSocialClick('google')}
            fullWidth
            sx={{ borderColor: 'transparent', color: 'text.primary', boxShadow: 'none', borderRadius: 2, py: 1.25, justifyContent: 'flex-start', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }, '& .MuiButton-startIcon': { marginLeft: 6 } }}
          >
            {t('signInGoogle')}
          </Button> */}
          {/* <Button
            variant="outlined"
            startIcon={<GoogleMulti />}
            onClick={() => googleLogin()}
            fullWidth
            sx={{
              borderColor: 'transparent',
              color: 'text.primary',
              boxShadow: 'none',
              borderRadius: 2,
              py: 1.25,
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
              },
              '& .MuiButton-startIcon': {
                marginLeft: 6,
              },
            }}
          >
            {t('signInGoogle')}
          </Button> */}

          <Button
            variant="outlined"
            startIcon={<GoogleMulti />}
            onClick={() => googleLogin()}
            fullWidth
          >
            Sign In With Google
          </Button>

          <Button
            variant="outlined"
            startIcon={<MicrosoftMulti />}
            onClick={() => handleSocialClick('microsoft')}
            fullWidth
            sx={{ borderColor: 'transparent', color: 'text.primary', boxShadow: 'none', borderRadius: 2, py: 1.25, justifyContent: 'flex-start', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }, '& .MuiButton-startIcon': { marginLeft: 6 } }}
          >
            {t('signInMicrosoft')}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        minHeight: fullPage ? '100vh' : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3 },
      }}
    >
      {card}
    </Box>
  );
}

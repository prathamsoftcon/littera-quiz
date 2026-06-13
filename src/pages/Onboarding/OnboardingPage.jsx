import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LoginComponent from '../../components/LoginComponent';
import OTPVerification from '../../components/OTPVerification';
import RoleRouting from '../../components/RoleRouting';
import OnboardingForm from '../../components/OnboardingForm';
import AccessConfirmation from '../../components/AccessConfirmation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from '../../context/TranslationContext';

const VERIFIED_MOBILES_KEY = 'verified_mobiles';

function getVerifiedMobiles() {
  try {
    const raw = localStorage.getItem(VERIFIED_MOBILES_KEY);
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveVerifiedMobile(mobile) {
  if (!mobile) {
    return;
  }
  const current = getVerifiedMobiles();
  if (current.includes(mobile)) {
    return;
  }
  localStorage.setItem(VERIFIED_MOBILES_KEY, JSON.stringify([...current, mobile]));
}

export default function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [phone, setPhone] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [authStarted, setAuthStarted] = useState(false);

  useEffect(() => {
    document.body.classList.add('onboarding-no-scroll');
    return () => document.body.classList.remove('onboarding-no-scroll');
  }, []);

  const next = (to = null) => {
    setStep((s) => {
      setHistory((h) => [...h, s]);
      return to === null ? s + 1 : to;
    });
  };

  const handleBack = () => {
    setHistory((h) => {
      if (!h || h.length === 0) {
        setStep((s) => Math.max(0, s - 1));
        return h || [];
      }
      const prev = h[h.length - 1];
      const newH = h.slice(0, -1);
      setStep(prev);
      return newH;
    });
  };
  const handleSendOTP = (m) => {
    setPhone(m);
    setAuthStarted(true);
    const verifiedMobiles = getVerifiedMobiles();
    if (verifiedMobiles.includes(m)) {
      next(2);
      return;
    }
    next(1);
  };

  const handleOTPVerify = () => {
    saveVerifiedMobile(phone);
    next(2);
  };

  const handleSocial = (provider, payload) => {
    if (provider === 'google') {
      setProfileData({ email: payload.email });
      // skip OTP and go to RoleRouting
      setAuthStarted(true);
      next(2);
    } else {
      if (provider === 'microsoft') {
        setProfileData({ email: payload.email });
        setAuthStarted(true);
        next(2);
        return;
      }
      console.log('social', provider, payload);
    }
  };

  const steps = [
    {
      title: t('signIn'),
      node: (
        <LoginComponent onSendOTP={handleSendOTP} onSocial={handleSocial} />
      ),
    },
    {
      title: t('otpVerification'),
      node: <OTPVerification phone={phone} onVerify={handleOTPVerify} onResend={() => {}} compact />,
    },
    {
      title: t('roleRouting'),
        node: (
          <RoleRouting
            detectedRole={null}
            compact
            onSelect={(r) => {
              if (r === 'admin') {
                navigate('/admin');
                return;
              }
              next(r === 'student' ? 3 : 4);
            }}
          />
        ),
    },
    {
      title: t('studentOnboarding'),
      node: <OnboardingForm type="student" onSave={(data) => { setProfileData(data); navigate('/student'); }} />,
    },
    {
      title: t('teacherOnboarding'),
      node: <OnboardingForm type="teacher" onSave={(data) => { setProfileData(data); next(5); }} />,
    },
    {
      title: t('accessConfirmation'),
      node: <AccessConfirmation summary={profileData} onContinue={() => {/* go to dashboard */}} compact />,
    },
  ];

  const active = steps[step] || steps[0];
  const showPopup = step > 0;

  return (
    <div className="flex items-center justify-center px-4" style={{ height: '100%', overflow: 'hidden' }}>
      <div className="w-full max-w-2xl">
        <div className="onboarding-stage" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 720, margin: '0 auto' }}>
            {steps[0].node}
          </div>
        </div>
      </div>

      <Dialog
        open={showPopup}
        maxWidth={step === 3 || step === 4 ? 'md' : 'sm'}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 0,
            overflow: 'visible',
            background: 'transparent',
            boxShadow: 'none',
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(15, 23, 42, 0.42)',
            backdropFilter: 'blur(5px)',
          },
        }}
      >
        <DialogContent sx={{ p: 0, overflow: 'visible' }}>
          {active.node}
        </DialogContent>
      </Dialog>

      {showPopup && (
        <div className="fixed bottom-4 right-4" style={{ zIndex: 1500 }}>
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 rounded text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <ArrowBackIosNewIcon fontSize="small" className="mr-2" />
            {t('back')}
          </button>
        </div>
      )}
    </div>
  );
}

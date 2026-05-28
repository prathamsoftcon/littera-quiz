import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from '../../components/Panel';
import StepFlow from '../../components/StepFlow';
import LoginComponent from '../../components/LoginComponent';
import OTPVerification from '../../components/OTPVerification';
import RoleRouting from '../../components/RoleRouting';
import StudentOnboardingForm from '../../components/StudentOnboardingForm';
import TeacherOnboardingForm from '../../components/TeacherOnboardingForm';
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
  const [role, setRole] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [authStarted, setAuthStarted] = useState(false);

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
  const handleNext = () => {
    if (step === 0) return; // Sign in step should use the form to proceed
    if (step < steps.length - 1) next();
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
      node: <OTPVerification phone={phone} onVerify={handleOTPVerify} onResend={() => {}} />,
    },
    {
      title: t('roleRouting'),
        node: (
          <RoleRouting
            detectedRole={null}
            onSelect={(r) => {
              if (r === 'admin') {
                navigate('/admin');
                return;
              }
              setRole(r);
              next(r === 'student' ? 3 : 4);
            }}
          />
        ),
    },
    {
      title: t('studentOnboarding'),
      node: <StudentOnboardingForm onSave={(data) => { setProfileData(data); navigate('/student'); }} />,
    },
    {
      title: t('teacherOnboarding'),
      node: <TeacherOnboardingForm onSave={(data) => { setProfileData(data); next(5); }} />,
    },
    {
      title: t('accessConfirmation'),
      node: <AccessConfirmation summary={profileData} onContinue={() => {/* go to dashboard */}} />,
    },
  ];

  const active = steps[step] || steps[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      {authStarted}

      <div className="w-full max-w-2xl">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ width: '100%', maxWidth: 720, margin: '0 auto', transform: 'translateY(-30px)' }}>
            {active.node}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`flex items-center px-6 py-3 rounded text-white ${step === 0 || step >= steps.length - 1 ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          <ArrowBackIosNewIcon fontSize="small" className="mr-2" />
          {t('back')}
        </button>

        {/* <button
          onClick={handleNext}
          disabled={step === 0 || step >= steps.length - 1}
          className={`px-4 py-2 rounded text-white ${step === 0 || step >= steps.length - 1 ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Next
        </button> */}
      </div>
    </div>
  );
}

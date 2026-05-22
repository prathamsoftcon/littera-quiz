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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function OnboardingPage() {
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
    next(1);
  };

  const handleSocial = (provider, payload) => {
    if (provider === 'google') {
      setProfileData({ email: payload.email });
      // skip OTP and go to RoleRouting
      setAuthStarted(true);
      next(2);
    } else {
      console.log('social', provider, payload);
    }
  };

  const steps = [
    {
      title: 'Sign In',
      node: (
        <LoginComponent onSendOTP={handleSendOTP} onSocial={handleSocial} />
      ),
    },
    {
      title: 'OTP Verification',
      node: <OTPVerification phone={phone} onVerify={() => next(2)} onResend={() => {}} />,
    },
    {
      title: 'Role Routing',
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
      title: 'Student Onboarding',
      node: <StudentOnboardingForm onSave={(data) => { setProfileData(data); navigate('/student'); }} />,
    },
    {
      title: 'Teacher Onboarding',
      node: <TeacherOnboardingForm onSave={(data) => { setProfileData(data); next(5); }} />,
    },
    {
      title: 'Access Confirmation',
      node: <AccessConfirmation summary={profileData} onContinue={() => {/* go to dashboard */}} />,
    },
  ];

  const active = steps[step] || steps[0];

  return (
    <div className="max-w-2xl mx-auto mt-10">

      {authStarted }

      <div>
        {step === 0 ? (
          <LoginComponent onSendOTP={handleSendOTP} onSocial={handleSocial} />
        ) : (
          <Panel title={active.title} className="mx-auto">
            {active.node}
          </Panel>
        )}

        
      </div>
      
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`flex items-center px-6 py-3 rounded text-white ${step === 0 || step >= steps.length - 1 ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          <ArrowBackIosNewIcon fontSize="small" className="mr-2" />
          Back
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

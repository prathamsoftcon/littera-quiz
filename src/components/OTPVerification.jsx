import React, { useState } from 'react';

export default function OTPVerification({ phone, onVerify, onResend }) {
  const [otp, setOtp] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-600">OTP sent to <span className="font-medium text-gray-800">{phone || '+91 XXXXX XXXXX'}</span></div>

      <div>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter OTP"
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex items-center">
        <button
          className={`px-4 py-2 rounded-md text-white ${otp.length === 6 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
          onClick={() => otp.length === 6 && onVerify && onVerify(otp)}
          disabled={otp.length !== 6}
        >
          Verify and Continue
        </button>

        <button
          className="ml-3 text-sm text-gray-700 hover:underline"
          onClick={() => onResend && onResend()}
        >
          Resend OTP
        </button>
      </div>

      
    </div>
  );
}

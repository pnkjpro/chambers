import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ScaleIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../stores/authStore';
import { LegalButton, LegalCard, LegalAlert } from '../components/UI/LegalComponents';
import { toast } from 'react-toastify';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { 
    verifyOtp, 
    sendOtp,
    loading, 
    verifyEmail, 
    verificationLabel,
    user
  } = useAuthStore();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Redirect if no email to verify
  useEffect(() => {
    if (!verifyEmail) {
      navigate('/login');
    }
  }, [verifyEmail, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    const otpData = {
      email: verifyEmail,
      otp: otpString,
      label: verificationLabel,
    };
    
    const result = await verifyOtp(otpData);
    if (result?.success) {
      toast.success('Email verified successfully!');
      if (verificationLabel === 'verify_email') {
        navigate('/dashboard');
      } else if (verificationLabel === 'reset_password') {
        navigate('/reset-password');
      }
    } else {
      setError(result?.message || 'Invalid OTP. Please try again.');
      toast.error(result?.message || 'Invalid OTP. Please try again.');
      // Clear OTP inputs on error
      setOtp(['', '', '', '', '', '']);
      const firstInput = document.querySelector('input[name="otp-0"]');
      if (firstInput) firstInput.focus();
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    const result = await sendOtp({ 
      email: verifyEmail, 
      label: verificationLabel 
    });
    
    if (result?.success) {
      toast.success('OTP sent successfully!');
      setCanResend(false);
      setCountdown(60);
    } else {
      toast.error(result?.message || 'Failed to resend OTP');
    }
  };

  const getTitle = () => {
    switch (verificationLabel) {
      case 'verify_email':
        return 'Verify Your Email';
      case 'reset_password':
        return 'Verify Reset Code';
      default:
        return 'Enter Verification Code';
    }
  };

  const getSubtitle = () => {
    switch (verificationLabel) {
      case 'verify_email':
        return 'Complete your account setup';
      case 'reset_password':
        return 'Enter the code to reset your password';
      default:
        return 'Enter the verification code';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <LegalCard className="w-full max-w-md p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <ShieldCheckIcon className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{getTitle()}</h1>
            <p className="text-slate-600 text-lg">{getSubtitle()}</p>
          </div>

          {error && (
            <LegalAlert type="error" className="mb-6">
              {error}
            </LegalAlert>
          )}

          <div className="text-center mb-6">
            <p className="text-slate-600">
              We've sent a 6-digit verification code to
            </p>
            <p className="font-semibold text-slate-800 mt-1">{verifyEmail}</p>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-left text-sm font-semibold text-slate-700 mb-4">
                Enter Verification Code
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-slate-800 shadow-sm hover:shadow-md"
                  />
                ))}
              </div>
            </div>

            <LegalButton 
              type="submit" 
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </LegalButton>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-300"
              >
                Resend Verification Code
              </button>
            ) : (
              <p className="text-slate-500">
                Resend code in {countdown} seconds
              </p>
            )}
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Back to{' '}
              <Link 
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </LegalCard>
      </div>
    </div>
  );
};

export default VerifyOTP;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LegalInput, LegalButton, LegalCard, LegalLayout, LegalAlert } from '../components/UI/LegalComponents';
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
    <LegalLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-legal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary-800 font-legal">Chambers</h1>
            <p className="text-primary-600 mt-2">Legal Practice Management System</p>
          </div>

          <LegalCard title={getTitle()} subtitle={getSubtitle()}>
            {error && (
              <LegalAlert type="error" className="mb-6">
                {error}
              </LegalAlert>
            )}

            <div className="text-center mb-6">
              <p className="text-primary-600">
                We've sent a 6-digit verification code to
              </p>
              <p className="font-semibold text-primary-800 mt-1">{verifyEmail}</p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-4 text-center">
                  Enter Verification Code
                </label>
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-primary-800"
                    />
                  ))}
                </div>
              </div>

              <LegalButton 
                type="submit" 
                loading={loading}
                className="w-full"
              >
                Verify Code
              </LegalButton>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="text-primary-600 text-sm">
                Didn't receive the code?{' '}
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="font-medium text-primary-600 hover:text-primary-500 underline"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-primary-400">
                    Resend in {countdown}s
                  </span>
                )}
              </p>
            </div>

            {/* Back to Login */}
            <div className="mt-4 text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                ← Back to Sign In
              </Link>
            </div>
          </LegalCard>

          {/* Security Notice */}
          <div className="mt-6 bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-primary-800">Security Notice</h4>
                <p className="text-xs text-primary-600 mt-1">
                  This verification code expires in 10 minutes. Never share this code with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default VerifyOTP;

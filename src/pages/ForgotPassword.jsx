import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ScaleIcon, 
  ShieldCheckIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { LegalInput, LegalButton, LegalCard, LegalAlert } from '../components/UI/LegalComponents';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading, user } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    const result = await forgotPassword(email);
    
    if (result?.success) {
      setEmailSent(true);
      toast.success('Password reset instructions sent to your email!');
    } else {
      setError(result?.message || 'Failed to send reset email');
      toast.error(result?.message || 'Failed to send reset email');
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
        {/* Clean, minimal background */}
        <div className="absolute inset-0 bg-white/50"></div>

        {/* Navigation Header */}
        <div className="relative z-10 p-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <ScaleIcon className="h-8 w-8 text-blue-600 group-hover:scale-105 transition-transform duration-300" />
            <span className="text-2xl font-bold text-slate-800">MeraBakil</span>
          </Link>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
          <LegalCard className="w-full max-w-md p-8 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Check Your Email</h1>
              <p className="text-slate-600 text-lg">Password reset instructions sent</p>
            </div>

            <LegalAlert type="success" className="mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </LegalAlert>

            <div className="space-y-6">
              <p className="text-slate-700 text-center">
                Please check your email and follow the instructions to reset your password.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3">What's next?</h4>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the reset link in the email</li>
                  <li>Enter a new password</li>
                  <li>Sign in with your new password</li>
                </ol>
              </div>

              <div className="space-y-3">
                <LegalButton 
                  onClick={() => navigate('/login')}
                  variant="primary"
                  className="w-full"
                >
                  Back to Sign In
                </LegalButton>
                
                <LegalButton 
                  variant="outline"
                  onClick={() => {
                    setEmailSent(false);
                    setEmail('');
                  }}
                  className="w-full"
                >
                  Try Different Email
                </LegalButton>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Remember your password?{' '}
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      {/* Clean, minimal background */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Navigation Header */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <ScaleIcon className="h-8 w-8 text-blue-600 group-hover:scale-105 transition-transform duration-300" />
          <span className="text-2xl font-bold text-slate-800">MeraBakil</span>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <LegalCard className="w-full max-w-md p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zM10 2L8.5 7h3L10 2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Forgot Password</h1>
            <p className="text-slate-600 text-lg">We'll send you reset instructions</p>
          </div>

          {error && (
            <LegalAlert type="error" className="mb-6">
              {error}
            </LegalAlert>
          )}

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <LegalInput
              label="Email Address"
              type="email"
              name="email"
              icon={EnvelopeIcon}
              placeholder="Enter your registered email"
              value={email}
              onChange={handleInputChange}
              required
            />

            <LegalButton 
              type="submit" 
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </LegalButton>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Remember your password?{' '}
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

export default ForgotPassword;

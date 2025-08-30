import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LegalInput, LegalButton, LegalCard, LegalLayout, LegalAlert } from '../components/UI/LegalComponents';
import { toast } from 'react-toastify';

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
      <LegalLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-legal-trust rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-primary-800 font-legal">Check Your Email</h1>
              <p className="text-primary-600 mt-2">Password reset instructions sent</p>
            </div>

            <LegalCard>
              <div className="text-center">
                <LegalAlert type="success" className="mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>
                </LegalAlert>

                <div className="space-y-4">
                  <p className="text-primary-700">
                    Please check your email and follow the instructions to reset your password.
                  </p>
                  
                  <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                    <h4 className="font-semibold text-primary-800 mb-2">What's next?</h4>
                    <ol className="text-sm text-primary-600 space-y-1 list-decimal list-inside">
                      <li>Check your email inbox (and spam folder)</li>
                      <li>Click the reset link in the email</li>
                      <li>Enter a new password</li>
                      <li>Sign in with your new password</li>
                    </ol>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <LegalButton 
                      onClick={() => navigate('/login')}
                      className="w-full"
                    >
                      Back to Sign In
                    </LegalButton>
                    
                    <LegalButton 
                      variant="outline"
                      onClick={() => {
                        setEmailSent(false);
                        setError('');
                      }}
                      className="w-full"
                    >
                      Try Different Email
                    </LegalButton>
                  </div>
                </div>
              </div>
            </LegalCard>
          </div>
        </div>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-legal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zM10 2L8.5 7h3L10 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary-800 font-legal">Reset Password</h1>
            <p className="text-primary-600 mt-2">We'll send you reset instructions</p>
          </div>

          <LegalCard title="Forgot Password" subtitle="Enter your email to get reset instructions">
            {error && (
              <LegalAlert type="error" className="mb-6">
                {error}
              </LegalAlert>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email Address
                </label>
                <LegalInput
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-primary-500 mt-2">
                  Enter the email address associated with your account
                </p>
              </div>

              <LegalButton 
                type="submit" 
                loading={loading}
                className="w-full"
              >
                Send Reset Instructions
              </LegalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-600">
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </LegalCard>

          {/* Help Section */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow-lg border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Need Help?
            </h3>
            <ul className="text-sm text-primary-600 space-y-1">
              <li>• Check your spam/junk folder if you don't see the email</li>
              <li>• Make sure you're using the correct email address</li>
              <li>• Contact support if you continue having issues</li>
            </ul>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default ForgotPassword;

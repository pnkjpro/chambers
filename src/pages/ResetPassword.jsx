import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LegalInput, LegalButton, LegalCard, LegalLayout, LegalAlert } from '../components/UI/LegalComponents';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, loading, user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: '',
    token: searchParams.get('token') || '',
    email: searchParams.get('email') || '',
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }

    setPasswordStrength({ score, feedback });
  };

  const getStrengthColor = (score) => {
    if (score < 2) return 'bg-red-500';
    if (score < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score) => {
    if (score < 2) return 'Weak';
    if (score < 4) return 'Medium';
    return 'Strong';
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.password || !formData.password_confirmation) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!formData.token || !formData.email) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }
    
    const result = await resetPassword(formData);
    
    if (result?.success) {
      toast.success('Password reset successfully! You can now sign in.');
      navigate('/login');
    } else {
      setError(result?.message || 'Failed to reset password');
      toast.error(result?.message || 'Failed to reset password');
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  // Check if we have required parameters
  if (!formData.token || !formData.email) {
    return (
      <LegalLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md">
            <LegalCard title="Invalid Reset Link" subtitle="This link is not valid">
              <LegalAlert type="error" className="mb-6">
                This password reset link is invalid or has expired.
              </LegalAlert>
              
              <div className="text-center space-y-4">
                <p className="text-primary-600">
                  Please request a new password reset to continue.
                </p>
                
                <div className="flex flex-col space-y-3">
                  <LegalButton 
                    onClick={() => navigate('/forgot-password')}
                    className="w-full"
                  >
                    Request New Reset
                  </LegalButton>
                  
                  <LegalButton 
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="w-full"
                  >
                    Back to Sign In
                  </LegalButton>
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
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary-800 font-legal">Reset Password</h1>
            <p className="text-primary-600 mt-2">Create a new secure password</p>
          </div>

          <LegalCard title="Set New Password" subtitle="Choose a strong password for your account">
            {error && (
              <LegalAlert type="error" className="mb-6">
                {error}
              </LegalAlert>
            )}

            <div className="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-sm text-primary-700">
                Resetting password for: <strong>{formData.email}</strong>
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  New Password
                </label>
                <LegalInput
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getStrengthColor(passwordStrength.score)}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength.score < 2 ? 'text-red-600' :
                        passwordStrength.score < 4 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {getStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-primary-600">
                        <span>Still need: </span>
                        {passwordStrength.feedback.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Confirm New Password
                </label>
                <LegalInput
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm new password"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  required
                />
                
                {/* Password Match Indicator */}
                {formData.password_confirmation && (
                  <div className="mt-1">
                    {formData.password === formData.password_confirmation ? (
                      <p className="text-xs text-green-600 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Passwords match
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Passwords don't match
                      </p>
                    )}
                  </div>
                )}
              </div>

              <LegalButton 
                type="submit" 
                loading={loading}
                className="w-full"
                disabled={passwordStrength.score < 3 || formData.password !== formData.password_confirmation}
              >
                Reset Password
              </LegalButton>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                ← Back to Sign In
              </Link>
            </div>
          </LegalCard>

          {/* Security Tips */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow-lg border border-primary-100">
            <h3 className="font-semibold text-primary-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Password Security Tips
            </h3>
            <ul className="text-sm text-primary-600 space-y-1">
              <li>• Use a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Avoid personal information like names or birthdays</li>
              <li>• Don't reuse passwords from other accounts</li>
              <li>• Consider using a password manager</li>
            </ul>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default ResetPassword;

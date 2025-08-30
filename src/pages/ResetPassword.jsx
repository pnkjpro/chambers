import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  ScaleIcon, 
  ShieldCheckIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../stores/authStore';
import { LegalInput, LegalButton, LegalCard, LegalAlert } from '../components/UI/LegalComponents';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
          <LegalCard className="w-full max-w-md p-8 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Invalid Reset Link</h1>
              <p className="text-slate-600 text-lg">This link is not valid</p>
            </div>

            <LegalAlert type="error" className="mb-6">
              This password reset link is invalid or has expired.
            </LegalAlert>
            
            <div className="text-center space-y-6">
              <p className="text-slate-600">
                Please request a new password reset to continue.
              </p>
              
              <div className="space-y-3">
                <LegalButton 
                  onClick={() => navigate('/forgot-password')}
                  variant="primary"
                  className="w-full"
                >
                  Request New Reset Link
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
                <LockClosedIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h1>
            <p className="text-slate-600 text-lg">Create a new secure password</p>
          </div>

          {error && (
            <LegalAlert type="error" className="mb-6">
              {error}
            </LegalAlert>
          )}

          <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-700">
              Resetting password for: <strong>{formData.email}</strong>
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="relative">
              <LegalInput
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                icon={LockClosedIcon}
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.score < 2 ? 'text-red-600' :
                      passwordStrength.score < 4 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getStrengthText(passwordStrength.score)}
                    </span>
                  </div>
                  
                  {passwordStrength.feedback.length > 0 && (
                    <div className="text-xs text-slate-600">
                      <span>Still need: </span>
                      {passwordStrength.feedback.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <LegalInput
                label="Confirm New Password"
                name="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                icon={LockClosedIcon}
                placeholder="Confirm new password"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
              
              {/* Password Match Indicator */}
              {formData.password_confirmation && (
                <div className="mt-2">
                  {formData.password === formData.password_confirmation ? (
                    <p className="text-xs text-green-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Passwords match
                    </p>
                  ) : (
                    <p className="text-xs text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading || passwordStrength.score < 3 || formData.password !== formData.password_confirmation}
              className="w-full"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
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

          {/* Security Tips */}
          <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clipRule="evenodd" />
              </svg>
              Password Security Tips
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Use a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Avoid personal information like names or birthdays</li>
              <li>• Don't reuse passwords from other accounts</li>
              <li>• Consider using a password manager</li>
            </ul>
          </div>
        </LegalCard>
      </div>
    </div>
  );
};

export default ResetPassword;

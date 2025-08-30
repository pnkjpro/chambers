import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LegalInput, LegalButton, LegalCard, LegalLayout, LegalAlert } from '../components/UI/LegalComponents';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { 
    login, 
    loading, 
    user, 
    verifyEmail, 
    verificationLabel 
  } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    const result = await login(formData);
    
    if (result?.success && result?.isVerified) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else if (result?.success && !result?.isVerified) {
      toast.info('Please verify your email to continue');
      navigate('/verify-otp');
    } else {
      setError(result?.message || 'Login failed');
      toast.error(result?.message || 'Login failed');
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  // Redirect to OTP verification if email needs verification
  if (verifyEmail && verificationLabel === 'verify_email') {
    navigate('/verify-otp');
    return null;
  }

  return (
    <LegalLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="w-16 h-16 bg-legal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary-800 font-legal">Chambers</h1>
            <p className="text-primary-600 mt-2">Legal Practice Management System</p>
          </div>

          <LegalCard title="Sign In" subtitle="Access your legal workspace">
            {error && (
              <LegalAlert type="error" className="mb-4">
                {error}
              </LegalAlert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email Address
                </label>
                <LegalInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Password
                </label>
                <LegalInput
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded"
                  />
                  <span className="ml-2 text-sm text-primary-600">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary-600 hover:text-primary-500 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <LegalButton 
                type="submit" 
                loading={loading}
                className="w-full"
              >
                Sign In
              </LegalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </LegalCard>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="w-10 h-10 bg-legal-justice rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-700">Secure Access</h3>
              <p className="text-sm text-primary-500">Bank-level security</p>
            </div>
            
            <div className="p-4">
              <div className="w-10 h-10 bg-legal-trust rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-700">Trusted Platform</h3>
              <p className="text-sm text-primary-500">Used by legal professionals</p>
            </div>
            
            <div className="p-4">
              <div className="w-10 h-10 bg-legal-wisdom rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary-700">Compliance Ready</h3>
              <p className="text-sm text-primary-500">Industry standards</p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default Login;

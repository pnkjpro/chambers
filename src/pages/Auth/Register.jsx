import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  ScaleIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  BuildingOffice2Icon, 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../stores/authStore';
import { toast } from 'react-toastify';
import { LegalInput, LegalButton, LegalCard, SocialButton } from '../../components/UI/LegalComponents';

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    profileType: 'individual'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    
    try {
      await register(formData);
      toast.success('Registration successful! Please verify your email.');
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    try {
      setIsLoading(true);
      const result = await loginWithGoogle();
      
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Google registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <LegalCard className="w-full max-w-2xl p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <ShieldCheckIcon className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Join MeraBakil</h1>
            <p className="text-slate-600 text-lg">Create your professional legal account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Type Selection */}
            <div className="mb-6">
              <label className="block text-left text-sm font-semibold text-slate-700 mb-3">Account Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="profileType"
                    value="individual"
                    checked={formData.profileType === 'individual'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.profileType === 'individual'
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <UserIcon className={`h-6 w-6 ${formData.profileType === 'individual' ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div>
                        <div className={`font-semibold ${formData.profileType === 'individual' ? 'text-blue-800' : 'text-slate-700'}`}>
                          Individual Account
                        </div>
                        <div className="text-sm text-slate-500">Personal use</div>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="profileType"
                    value="lawyer"
                    checked={formData.profileType === 'lawyer'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.profileType === 'lawyer'
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <BuildingOffice2Icon className={`h-6 w-6 ${formData.profileType === 'lawyer' ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <div>
                        <div className={`font-semibold ${formData.profileType === 'lawyer' ? 'text-indigo-800' : 'text-slate-700'}`}>
                          Lawyer Account
                        </div>
                        <div className="text-sm text-slate-500">Professional practice</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <LegalInput
              label="Full Name"
              name="name"
              type="text"
              icon={UserIcon}
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />

            <LegalInput
              label="Email Address"
              name="email"
              type="email"
              icon={EnvelopeIcon}
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />

            <LegalInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              icon={PhoneIcon}
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter your mobile number"
            />

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <LegalInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  icon={LockClosedIcon}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <LegalInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  icon={LockClosedIcon}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {formData.profileType === 'personal' && (
              <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2" />
                  Professional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LegalInput
                    label="Specialization"
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Family Law"
                  />

                  <LegalInput
                    label="Years of Experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    placeholder="Years practicing"
                    min="0"
                  />
                </div>

                <LegalInput
                  label="License Number"
                  name="licenseNumber"
                  type="text"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your bar license number"
                />
              </div>
            )}

            <LegalButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </LegalButton>
          </form>

          {/* Social Login - placed after manual registration */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <SocialButton
                provider="google"
                onClick={handleSocialLogin}
                disabled={isLoading}
                className="w-full"
              />
            </div>
          </div>

          {/* Sign In Link - moved below social login */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link 
                to="/login"
                className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </LegalCard>
      </div>
    </div>
  );
};

export default Register;

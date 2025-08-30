import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Scale, Shield, Users, Building2, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { LegalInput, LegalButton, LegalCard, SocialButton } from '../components/UI/LegalComponents';

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loginWithLinkedIn, loginWithMicrosoft } = useAuthStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    profileType: 'personal',
    specialization: '',
    licenseNumber: '',
    firmName: '',
    experience: ''
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

  const handleSocialLogin = async (provider) => {
    try {
      setIsLoading(true);
      let result;
      
      switch (provider) {
        case 'google':
          result = await loginWithGoogle();
          break;
        case 'linkedin':
          result = await loginWithLinkedIn();
          break;
        case 'microsoft':
          result = await loginWithMicrosoft();
          break;
        default:
          throw new Error('Unsupported provider');
      }
      
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(`${provider} registration failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 relative overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-navy-500/20 to-gold-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-gold-500/20 to-navy-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-navy-500/10 via-transparent to-transparent rounded-full"></div>
      </div>

      {/* Premium Navigation Header */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Scale className="h-8 w-8 text-gold-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gold-500/20 blur-lg group-hover:blur-xl transition-all duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gold-500 to-gold-300 bg-clip-text text-transparent">
            Chambers
          </span>
        </Link>
        
        <Link 
          to="/login"
          className="text-slate-300 hover:text-gold-400 font-medium transition-all duration-300 hover:scale-105"
        >
          Already have an account? <span className="text-gold-500 font-semibold">Sign In</span>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
        <LegalCard className="w-full max-w-2xl p-8 animate-fade-in">
          {/* Elegant Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="h-16 w-16 text-gold-500 animate-glow" />
                <div className="absolute inset-0 bg-gold-500/20 blur-xl"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Join Chambers</h1>
            <p className="text-slate-600 text-lg">Create your professional legal account</p>
          </div>

          {/* Social Registration Options */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <SocialButton
                provider="google"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex-1"
              />
              <SocialButton
                provider="linkedin"
                onClick={() => handleSocialLogin('linkedin')}
                disabled={isLoading}
                className="flex-1"
              />
              <SocialButton
                provider="microsoft"
                onClick={() => handleSocialLogin('microsoft')}
                disabled={isLoading}
                className="flex-1"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">Or register with email</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Profile Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="profileType"
                    value="personal"
                    checked={formData.profileType === 'personal'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.profileType === 'personal'
                      ? 'border-gold-500 bg-gradient-to-br from-gold-50 to-gold-100 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <User className={`h-6 w-6 ${formData.profileType === 'personal' ? 'text-gold-600' : 'text-slate-400'}`} />
                      <div>
                        <div className={`font-semibold ${formData.profileType === 'personal' ? 'text-gold-800' : 'text-slate-700'}`}>
                          Personal Lawyer
                        </div>
                        <div className="text-sm text-slate-500">Individual practice</div>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="profileType"
                    value="business"
                    checked={formData.profileType === 'business'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.profileType === 'business'
                      ? 'border-navy-500 bg-gradient-to-br from-navy-50 to-navy-100 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Building2 className={`h-6 w-6 ${formData.profileType === 'business' ? 'text-navy-600' : 'text-slate-400'}`} />
                      <div>
                        <div className={`font-semibold ${formData.profileType === 'business' ? 'text-navy-800' : 'text-slate-700'}`}>
                          Business Lawyer
                        </div>
                        <div className="text-sm text-slate-500">Corporate practice</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LegalInput
                label="First Name"
                name="firstName"
                type="text"
                icon={User}
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
              />

              <LegalInput
                label="Last Name"
                name="lastName"
                type="text"
                icon={User}
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
              />
            </div>

            <LegalInput
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />

            <LegalInput
              label="Phone Number"
              name="phone"
              type="tel"
              icon={Phone}
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />

            <LegalInput
              label="Address"
              name="address"
              type="text"
              icon={MapPin}
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your address"
            />

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <LegalInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <LegalInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Professional Details */}
            {formData.profileType === 'business' && (
              <div className="space-y-6 p-6 bg-gradient-to-br from-navy-50 to-navy-100 rounded-xl border border-navy-200">
                <h3 className="text-lg font-semibold text-navy-800 flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Business Information
                </h3>
                
                <LegalInput
                  label="Firm Name"
                  name="firmName"
                  type="text"
                  value={formData.firmName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your firm name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LegalInput
                    label="Specialization"
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Corporate Law"
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

            {formData.profileType === 'personal' && (
              <div className="space-y-6 p-6 bg-gradient-to-br from-gold-50 to-gold-100 rounded-xl border border-gold-200">
                <h3 className="text-lg font-semibold text-gold-800 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
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

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-navy-600 hover:text-navy-500 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-navy-600 hover:text-navy-500 font-medium">
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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LegalInput, LegalButton, LegalCard, LegalLayout, LegalAlert, LegalSelect, LegalTextarea } from '../components/UI/LegalComponents';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const { register, registerBusinessLawyer, loading, user } = useAuthStore();
  
  const [profileType, setProfileType] = useState('personal');
  const [formData, setFormData] = useState({
    // Personal fields
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    
    // Business fields
    law_firm_name: '',
    license_number: '',
    practice_areas: '',
    years_of_experience: '',
    bar_association: '',
    specializations: '',
  });
  const [error, setError] = useState('');

  const practiceAreas = [
    { value: 'criminal', label: 'Criminal Law' },
    { value: 'civil', label: 'Civil Law' },
    { value: 'corporate', label: 'Corporate Law' },
    { value: 'family', label: 'Family Law' },
    { value: 'immigration', label: 'Immigration Law' },
    { value: 'intellectual', label: 'Intellectual Property' },
    { value: 'real_estate', label: 'Real Estate Law' },
    { value: 'tax', label: 'Tax Law' },
    { value: 'labor', label: 'Labor & Employment' },
    { value: 'environmental', label: 'Environmental Law' },
  ];

  const experienceYears = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '11-15', label: '11-15 years' },
    { value: '16-20', label: '16-20 years' },
    { value: '20+', label: '20+ years' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return 'Please fill in all required fields';
    }
    
    if (formData.password !== formData.password_confirmation) {
      return 'Passwords do not match';
    }
    
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (profileType === 'business') {
      if (!formData.law_firm_name || !formData.license_number || !formData.practice_areas) {
        return 'Please fill in all business lawyer required fields';
      }
    }
    
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      let result;
      const userData = {
        ...formData,
        profile_type: profileType
      };

      if (profileType === 'business') {
        result = await registerBusinessLawyer(userData);
      } else {
        result = await register(userData);
      }
      
      if (result?.success) {
        toast.success('Registration successful! Please verify your email.');
        navigate('/verify-otp');
      } else {
        setError(result?.message || 'Registration failed');
        toast.error(result?.message || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred during registration';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <LegalLayout>
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-legal-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary-800 font-legal">Join Chambers</h1>
            <p className="text-primary-600 mt-2">Create your legal professional account</p>
          </div>

          <LegalCard>
            {error && (
              <LegalAlert type="error" className="mb-6">
                {error}
              </LegalAlert>
            )}

            {/* Profile Type Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary-800 mb-4">Choose Your Profile Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    profileType === 'personal' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-primary-200 hover:border-primary-300'
                  }`}
                  onClick={() => setProfileType('personal')}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="profileType"
                      value="personal"
                      checked={profileType === 'personal'}
                      onChange={(e) => setProfileType(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-lg font-medium text-primary-800">Personal Lawyer</span>
                  </div>
                  <p className="text-sm text-primary-600 ml-6">
                    Individual practitioners and solo lawyers
                  </p>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    profileType === 'business' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-primary-200 hover:border-primary-300'
                  }`}
                  onClick={() => setProfileType('business')}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="profileType"
                      value="business"
                      checked={profileType === 'business'}
                      onChange={(e) => setProfileType(e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-lg font-medium text-primary-800">Business Lawyer</span>
                  </div>
                  <p className="text-sm text-primary-600 ml-6">
                    Law firms and corporate legal departments
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Full Name *
                  </label>
                  <LegalInput
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Phone Number
                  </label>
                  <LegalInput
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email Address *
                </label>
                <LegalInput
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Password *
                  </label>
                  <LegalInput
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-primary-500 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Confirm Password *
                  </label>
                  <LegalInput
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm your password"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Business Lawyer Additional Fields */}
              {profileType === 'business' && (
                <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                  <h4 className="text-lg font-semibold text-primary-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    Business Lawyer Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        Law Firm Name *
                      </label>
                      <LegalInput
                        name="law_firm_name"
                        placeholder="Enter law firm name"
                        value={formData.law_firm_name}
                        onChange={handleInputChange}
                        required={profileType === 'business'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        License Number *
                      </label>
                      <LegalInput
                        name="license_number"
                        placeholder="Enter bar license number"
                        value={formData.license_number}
                        onChange={handleInputChange}
                        required={profileType === 'business'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        Primary Practice Area *
                      </label>
                      <LegalSelect
                        name="practice_areas"
                        placeholder="Select practice area"
                        options={practiceAreas}
                        value={formData.practice_areas}
                        onChange={handleInputChange}
                        required={profileType === 'business'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        Years of Experience
                      </label>
                      <LegalSelect
                        name="years_of_experience"
                        placeholder="Select experience"
                        options={experienceYears}
                        value={formData.years_of_experience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Bar Association
                    </label>
                    <LegalInput
                      name="bar_association"
                      placeholder="e.g., State Bar of California"
                      value={formData.bar_association}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Specializations
                    </label>
                    <LegalTextarea
                      name="specializations"
                      placeholder="Describe your legal specializations and areas of expertise..."
                      value={formData.specializations}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded mt-1"
                />
                <span className="ml-2 text-sm text-primary-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <LegalButton 
                type="submit" 
                loading={loading}
                className="w-full"
              >
                Create {profileType === 'business' ? 'Business' : 'Personal'} Account
              </LegalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </LegalCard>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-primary-100">
              <div className="w-12 h-12 bg-legal-justice rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Case Management</h3>
              <p className="text-primary-600 text-sm">
                Organize cases, documents, and client communications in one secure platform.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-primary-100">
              <div className="w-12 h-12 bg-legal-trust rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zM10 2L8.5 7h3L10 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Client Portal</h3>
              <p className="text-primary-600 text-sm">
                Give clients secure access to their case status and important documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default Register;

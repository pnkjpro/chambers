import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

// Sophisticated input component with modern styling
export const LegalInput = ({ 
  type = "text", 
  placeholder, 
  name,
  label,
  required = false, 
  className = "",
  icon: Icon,
  ...props 
}) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative group">
      {Icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-navy-500 transition-colors duration-200">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-all duration-300 text-slate-800 placeholder-slate-400 shadow-sm hover:shadow-md focus:shadow-lg ${className}`}
        {...props}
      />
    </div>
  </div>
);

// Premium button component with multiple variants
export const LegalButton = ({ 
  variant = "primary", 
  size = "md",
  children, 
  loading = false, 
  disabled = false,
  className = "",
  icon,
  ...props 
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg border-0 hover:from-blue-700 hover:to-blue-800",
    secondary: "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md hover:shadow-lg border-0 hover:from-indigo-700 hover:to-indigo-800",
    outline: "border-2 border-blue-500 text-blue-600 hover:bg-blue-50 bg-white shadow-sm hover:shadow-md",
    ghost: "text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg border-0",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg border-0",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm font-medium",
    md: "px-6 py-3 text-base font-semibold",
    lg: "px-8 py-4 text-lg font-semibold",
    xl: "px-10 py-5 text-xl font-bold",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:ring-4 focus:ring-navy-500/20 focus:outline-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      <div className="relative flex items-center justify-center space-x-2">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            {icon && <span className="text-lg">{icon}</span>}
            <span>{children}</span>
          </>
        )}
      </div>
    </button>
  );
};

// Elegant card component with clean styling
export const LegalCard = ({ children, className = "", title, subtitle }) => (
  <div className={`relative bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden ${className}`}>
    {(title || subtitle) && (
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
        <div className="relative">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {subtitle && <p className="text-blue-100 mt-2 font-medium">{subtitle}</p>}
        </div>
      </div>
    )}
    <div className="relative p-8">
      {children}
    </div>
  </div>
);

// Sophisticated select component
export const LegalSelect = ({ 
  options = [], 
  placeholder = "Select option", 
  name, 
  required = false,
  className = "",
  icon,
  ...props 
}) => (
  <div className="relative group">
    {icon && (
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 group-focus-within:text-navy-500 transition-colors duration-200 z-10">
        {icon}
      </div>
    )}
    <select
      name={name}
      required={required}
      className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-10 py-4 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-all duration-300 text-primary-800 shadow-soft hover:shadow-medium appearance-none cursor-pointer ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value} className="py-2">
          {option.label}
        </option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-400 pointer-events-none">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
);

// Premium textarea component
export const LegalTextarea = ({ 
  placeholder, 
  name, 
  required = false, 
  rows = 4,
  className = "",
  ...props 
}) => (
  <textarea
    name={name}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className={`w-full px-4 py-4 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-all duration-300 text-primary-800 placeholder-primary-400 resize-vertical shadow-soft hover:shadow-medium focus:shadow-large ${className}`}
    {...props}
  />
);

// Modern alert component with icons
export const LegalAlert = ({ type = "info", children, className = "", dismissible = false, onDismiss }) => {
  const types = {
    success: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
      icon: (
        <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: "bg-red-50 border-red-200 text-red-800",
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    },
    warning: {
      bg: "bg-amber-50 border-amber-200 text-amber-800",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: "bg-blue-50 border-blue-200 text-blue-800",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    },
  };

  const config = types[type];

  return (
    <div className={`border rounded-xl p-4 shadow-soft ${config.bg} ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="flex-1">
          {children}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-current hover:opacity-75 transition-opacity"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Premium layout wrapper with sophisticated background
export const LegalLayout = ({ children, className = "" }) => (
  <div className={`min-h-screen bg-gradient-hero relative ${className}`}>
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-navy-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
    </div>
    
    {/* Content */}
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  </div>
);

// Social login button component
export const SocialButton = ({ provider = 'google', onClick, loading, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-all duration-200 hover:shadow-md focus:ring-4 focus:ring-blue-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
      ) : (
        <>
          <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 text-red-500" />
          <span className="font-medium">Continue with Google</span>
        </>
      )}
    </button>
  );
};

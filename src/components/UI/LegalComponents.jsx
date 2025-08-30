import React from 'react';

// Input component with legal theme
export const LegalInput = ({ 
  type = "text", 
  placeholder, 
  name, 
  required = false, 
  className = "",
  ...props 
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    required={required}
    className={`w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-primary-800 placeholder-primary-400 ${className}`}
    {...props}
  />
);

// Button component with legal theme variants
export const LegalButton = ({ 
  variant = "primary", 
  children, 
  loading = false, 
  disabled = false,
  className = "",
  ...props 
}) => {
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-lg",
    secondary: "bg-secondary-500 hover:bg-secondary-600 text-primary-900 shadow-lg",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg",
    success: "bg-green-600 hover:bg-green-700 text-white shadow-lg",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : children}
    </button>
  );
};

// Card component with legal theme
export const LegalCard = ({ children, className = "", title, subtitle }) => (
  <div className={`bg-white rounded-xl shadow-xl border border-primary-100 overflow-hidden ${className}`}>
    {(title || subtitle) && (
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-4 text-white">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {subtitle && <p className="text-primary-100 mt-1">{subtitle}</p>}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

// Select component with legal theme
export const LegalSelect = ({ 
  options = [], 
  placeholder = "Select option", 
  name, 
  required = false,
  className = "",
  ...props 
}) => (
  <select
    name={name}
    required={required}
    className={`w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-primary-800 ${className}`}
    {...props}
  >
    <option value="">{placeholder}</option>
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Textarea component with legal theme
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
    className={`w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-primary-800 placeholder-primary-400 resize-vertical ${className}`}
    {...props}
  />
);

// Alert component
export const LegalAlert = ({ type = "info", children, className = "" }) => {
  const types = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className={`border rounded-lg p-4 ${types[type]} ${className}`}>
      {children}
    </div>
  );
};

// Layout wrapper
export const LegalLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  </div>
);

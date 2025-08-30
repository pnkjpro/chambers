# 🏛️ Chambers - Legal Practice Management System

A comprehensive React-based authentication system designed specifically for legal professionals, featuring elegant legal-themed UI and dual registration types for personal and business lawyers.

## ✨ Features Overview

### 🔐 Complete Authentication System
- **Login** - Secure access with email verification
- **Registration** - Dual profile types (Personal & Business Lawyer)
- **OTP Verification** - Email verification with resend functionality
- **Forgot Password** - Email-based password reset
- **Reset Password** - Secure password reset with strength validation

### 👨‍⚖️ Profile Types
1. **Personal Lawyer** - Individual practitioners and solo lawyers
2. **Business Lawyer** - Law firms and corporate legal departments with additional fields:
   - Law Firm Name
   - License Number
   - Practice Areas (Criminal, Civil, Corporate, Family, etc.)
   - Years of Experience
   - Bar Association
   - Specializations

### 🎨 Legal-Inspired Design
- **Primary Colors**: Professional blue-grey palette inspired by legal documents
- **Secondary Colors**: Gold accents reminiscent of scales of justice
- **Accent Colors**: 
  - Justice Blue (#1e40af)
  - Authority Brown (#7c2d12)
  - Trust Green (#065f46)
  - Wisdom Purple (#581c87)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
VITE_API_URL=http://your-api-domain.com/api
VITE_BASE_API=http://your-api-domain.com
```

### 3. Start Development
```bash
npm run dev
```

## 📱 Pages & Components

### Authentication Pages
- **`/login`** - Professional login with security features
- **`/register`** - Dual-type registration with business lawyer fields
- **`/verify-otp`** - 6-digit OTP verification with auto-focus
- **`/forgot-password`** - Email-based reset request
- **`/reset-password`** - Secure password reset with strength meter
- **`/dashboard`** - Professional dashboard with profile management

### UI Components (`/src/components/UI/LegalComponents.jsx`)
- **LegalInput** - Themed input fields
- **LegalButton** - Professional buttons with loading states
- **LegalCard** - Elegant card components
- **LegalSelect** - Styled dropdowns
- **LegalTextarea** - Multi-line text inputs
- **LegalAlert** - Status and error messages
- **LegalLayout** - Consistent page wrapper

## 🏗️ Project Structure

```
src/
├── components/
│   └── UI/
│       └── LegalComponents.jsx    # Reusable UI components
├── pages/
│   ├── Login.jsx                  # Login page
│   ├── Register.jsx               # Registration with profile types
│   ├── VerifyOTP.jsx             # OTP verification
│   ├── ForgotPassword.jsx        # Password reset request
│   └── ResetPassword.jsx         # Password reset form
├── stores/
│   └── authStore.js              # Zustand auth store
├── styles/
│   └── theme.js                  # Legal color theme
├── utils/
│   └── axios.js                  # API configuration
├── App.jsx                       # Main app with routing
├── index.css                     # Global styles
└── main.jsx                      # App entry point
```

## 🔧 API Integration

### Enhanced Auth Store Methods

```javascript
// Personal registration
const result = await register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  profile_type: 'personal'
});

// Business lawyer registration
const result = await registerBusinessLawyer({
  name: 'Jane Smith',
  email: 'jane@lawfirm.com',
  password: 'password123',
  law_firm_name: 'Smith & Associates',
  license_number: 'CA123456',
  practice_areas: 'corporate',
  years_of_experience: '10-15',
  bar_association: 'State Bar of California'
});

// Forgot password
const result = await forgotPassword('user@example.com');

// Reset password (from email link)
const result = await resetPassword({
  email: 'user@example.com',
  token: 'reset-token',
  password: 'newpassword123',
  password_confirmation: 'newpassword123'
});
```

### Required API Endpoints

Your backend should implement these endpoints:

```
POST /users/create          # Registration (both types)
POST /users/login           # User login
POST /users/logout          # User logout
GET  /users/user            # Get current user
POST /users/otp/send        # Send OTP
POST /users/otp/verify      # Verify OTP
POST /users/password/forgot # Send reset email
POST /users/password/reset  # Reset password
POST /users/update/upi      # Update UPI ID
```

## 🎨 Color Palette

### Primary Colors (Professional Blue-Grey)
- `primary-50`: #f0f4f8 (Very light)
- `primary-500`: #627d98 (Base)
- `primary-900`: #102a43 (Darkest)

### Secondary Colors (Legal Gold)
- `secondary-50`: #fffdf0 (Very light)
- `secondary-500`: #eab308 (Base)
- `secondary-900`: #713f12 (Darkest)

### Accent Colors
- `legal-justice`: #1e40af (Deep blue)
- `legal-authority`: #7c2d12 (Deep brown)
- `legal-trust`: #065f46 (Deep green)
- `legal-wisdom`: #581c87 (Deep purple)

## 🎯 Usage Examples

### Registration Form with Profile Type Selection

```jsx
import { Register } from './pages/Register';

// Renders form with:
// - Profile type selector (Personal/Business)
// - Common fields (name, email, password)
// - Business-specific fields (when business selected)
// - Terms acceptance
// - Professional styling
```

### OTP Verification

```jsx
import { VerifyOTP } from './pages/VerifyOTP';

// Features:
// - 6-digit OTP input with auto-focus
// - Resend functionality with countdown
// - Professional error handling
// - Security notices
```

### Password Reset Flow

```jsx
// Step 1: Request reset
import { ForgotPassword } from './pages/ForgotPassword';

// Step 2: Reset with token
import { ResetPassword } from './pages/ResetPassword';

// Features:
// - Email validation
// - Password strength meter
// - Token validation
// - Security tips
```

## 🔒 Security Features

- **Password Strength Validation** - Real-time feedback
- **Email Verification** - Required for account activation
- **Token-based Authentication** - JWT tokens with auto-refresh
- **CSRF Protection** - Built-in Laravel Sanctum support
- **Rate Limiting** - OTP resend countdown
- **Secure Headers** - Automatic security headers

## 📱 Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Touch-friendly interactive elements
- Optimized forms for mobile keyboards
- Professional appearance on all devices

## 🚀 Production Ready

- **SEO Optimized** - Proper meta tags and structure
- **Accessibility** - WCAG compliant components
- **Performance** - Optimized bundle size
- **Error Handling** - Comprehensive error management
- **Loading States** - Professional loading indicators
- **Toast Notifications** - User-friendly feedback

## 🤝 Contributing

This is a complete authentication system ready for legal practice management platforms. The design and functionality are specifically tailored for lawyers and legal professionals.

## 📄 License

Professional legal practice management system - All rights reserved.

---

**Built with ⚖️ for legal professionals** - Combining modern web technology with the timeless principles of justice and professional excellence.

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './stores/authStore';
import './App.css';

// Example Login component using Zustand store
const Login = () => {
  const { 
    login, 
    loading, 
    user, 
    verifyEmail, 
    verificationLabel 
  } = useAuthStore();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    
    const result = await login(credentials);
    if (result?.success && result?.isVerified) {
      console.log('Login successful');
    } else if (result?.success && !result?.isVerified) {
      console.log('Email verification required');
    }
  };

  if (user) {
    return <Dashboard />;
  }

  if (verifyEmail && verificationLabel === 'verify_email') {
    return <VerifyOTP />;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const VerifyOTP = () => {
  const { 
    verifyOtp, 
    loading, 
    verifyEmail, 
    verificationLabel 
  } = useAuthStore();
  
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otpData = {
      email: verifyEmail,
      otp: formData.get('otp'),
      label: verificationLabel,
    };
    
    const result = await verifyOtp(otpData);
    if (result.success) {
      console.log('OTP verified successfully');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to {verifyEmail}</p>
      <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          name="otp" 
          type="text" 
          placeholder="Enter OTP" 
          required 
          maxLength="6"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

const Dashboard = () => {
  const { user, logout, updateUpiId, loading } = useAuthStore();
  
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log('Logged out successfully');
    }
  };

  const handleUpdateUpi = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUpiId = formData.get('upi_id');
    
    const result = await updateUpiId(newUpiId);
    if (result.success) {
      console.log('UPI ID updated successfully');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1>Dashboard</h1>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Welcome, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
        <p>UPI ID: {user?.upi_id || 'Not set'}</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Update UPI ID</h3>
        <form onSubmit={handleUpdateUpi} style={{ display: 'flex', gap: '10px' }}>
          <input 
            name="upi_id" 
            type="text" 
            placeholder="Enter UPI ID" 
            defaultValue={user?.upi_id || ''}
            style={{ 
              flex: 1, 
              padding: '10px', 
              borderRadius: '4px', 
              border: '1px solid #ccc' 
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#ffc107', 
              color: 'black', 
              border: 'none', 
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Updating...' : 'Update UPI'}
          </button>
        </form>
      </div>
      
      <button 
        onClick={handleLogout} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

// Initialize auth store on app start
const AppInitializer = ({ children }) => {
  const init = useAuthStore((state) => state.init);
  
  useEffect(() => {
    init();
  }, [init]);
  
  return children;
};

function App() {
  return (
    <Router>
      <AppInitializer>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </AppInitializer>
    </Router>
  );
}

export default App

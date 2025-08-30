import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './stores/authStore';

// Import page components
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './App.css';

// Example Dashboard component using Zustand store
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-xl border border-primary-100 mb-8">
            <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-4 text-white rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-primary-100">Welcome back, {user?.name}!</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  disabled={loading}
                  className="px-4 py-2 bg-primary-800 hover:bg-primary-900 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* User Info Card */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200 mb-6">
                <h2 className="text-xl font-semibold text-primary-800 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">Name</label>
                    <p className="text-primary-800 font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">Email</label>
                    <p className="text-primary-800">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">Profile Type</label>
                    <p className="text-primary-800 capitalize">
                      {user?.profile_type || 'Personal'} 
                      {user?.profile_type === 'business' ? ' Lawyer' : ' Lawyer'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">UPI ID</label>
                    <p className="text-primary-800">{user?.upi_id || 'Not set'}</p>
                  </div>
                </div>
                
                {/* Business lawyer additional info */}
                {user?.profile_type === 'business' && (
                  <div className="mt-4 pt-4 border-t border-primary-200">
                    <h3 className="font-semibold text-primary-800 mb-3">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary-700 mb-1">Law Firm</label>
                        <p className="text-primary-800">{user?.law_firm_name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary-700 mb-1">License Number</label>
                        <p className="text-primary-800">{user?.license_number || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary-700 mb-1">Practice Areas</label>
                        <p className="text-primary-800 capitalize">{user?.practice_areas?.replace('_', ' ') || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary-700 mb-1">Experience</label>
                        <p className="text-primary-800">{user?.years_of_experience || 'N/A'} years</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* UPI Update Form */}
              <div className="bg-white rounded-lg border border-primary-200 p-6">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">Update UPI ID</h3>
                <form onSubmit={handleUpdateUpi} className="flex gap-4">
                  <input 
                    name="upi_id" 
                    type="text" 
                    placeholder="Enter UPI ID" 
                    defaultValue={user?.upi_id || ''}
                    className="flex-1 px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white text-primary-800"
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-primary-900 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update UPI'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-primary-100">
              <div className="w-12 h-12 bg-legal-justice rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h1a1 1 0 001-1V3a2 2 0 012 2v6.447A1 1 0 0110.447 12L10 12.447l-.447-.447A1 1 0 0113 11.447V5a2 2 0 012 2v4a1 1 0 001 1h2a1 1 0 001-1V5a2 2 0 00-2-2h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1V3H6a2 2 0 00-2 2v6.447A1 1 0 003.553 12L4 11.553V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Case Management</h3>
              <p className="text-primary-600 text-sm">Manage your legal cases and documents</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg border border-primary-100">
              <div className="w-12 h-12 bg-legal-trust rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Client Portal</h3>
              <p className="text-primary-600 text-sm">Connect with clients securely</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg border border-primary-100">
              <div className="w-12 h-12 bg-legal-wisdom rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Billing & Invoices</h3>
              <p className="text-primary-600 text-sm">Track payments and generate invoices</p>
            </div>
          </div>
        </div>
      </div>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
            toastClassName="!bg-white !text-primary-800 !border !border-primary-200"
            progressClassName="!bg-primary-500"
          />
        </div>
      </AppInitializer>
    </Router>
  );
}

export default App

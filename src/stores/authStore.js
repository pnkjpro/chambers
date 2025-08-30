import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import api from '../utils/axios';
import { toast } from 'react-toastify';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      loading: false,
      error: null,
      token: null,
      verifyEmail: '',
      verificationLabel: '',
      profileType: 'personal', // 'personal' or 'business'

      // Actions
      setLoading: (loading) => set({ loading }),
      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),
      setVerifyEmail: (email) => set({ verifyEmail: email }),
      setVerificationLabel: (label) => set({ verificationLabel: label }),
      setProfileType: (type) => set({ profileType: type }),
      
      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem('authToken', token);
        } else {
          localStorage.removeItem('authToken');
        }
      },

      clearAuth: () => {
        set({ 
          user: null, 
          token: null, 
          error: null, 
          verifyEmail: '', 
          verificationLabel: '',
          profileType: 'personal'
        });
        localStorage.removeItem('authToken');
      },

      // Initialize auth state
      init: async () => {
        const { setLoading, setToken, fetchUser, clearAuth } = get();
        setLoading(true);
        const storedToken = localStorage.getItem('authToken');
        
        if (storedToken) {
          setToken(storedToken);
          try {
            await fetchUser();
          } catch (error) {
            clearAuth();
          }
        }
        
        setLoading(false);
      },

      // Register function (updated for profile types)
      register: async (userData) => {
        const { setLoading, setVerifyEmail, setVerificationLabel, setProfileType } = get();
        setLoading(true);
        try {
          // Add profile type to userData
          const registrationData = {
            ...userData,
            profile_type: userData.profile_type || 'personal'
          };
          
          const response = await api.post('/users/create', registrationData);
          setVerifyEmail(response.data.data.email);
          setVerificationLabel('verify_email');
          setProfileType(userData.profile_type || 'personal');
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error registering user:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
        }
      },

      // Register Business Lawyer
      registerBusinessLawyer: async (userData) => {
        const { setLoading, setVerifyEmail, setVerificationLabel, setProfileType } = get();
        setLoading(true);
        try {
          const businessData = {
            ...userData,
            profile_type: 'business',
            // Business-specific fields
            law_firm_name: userData.law_firm_name,
            license_number: userData.license_number,
            practice_areas: userData.practice_areas,
            years_of_experience: userData.years_of_experience,
            bar_association: userData.bar_association,
          };
          
          const response = await api.post('/users/create', businessData);
          setVerifyEmail(response.data.data.email);
          setVerificationLabel('verify_email');
          setProfileType('business');
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error registering business lawyer:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
        }
      },

      // Forgot Password - Send reset email
      forgotPassword: async (email) => {
        const { setLoading, setVerifyEmail, setVerificationLabel } = get();
        setLoading(true);
        try {
          const response = await api.post('/users/password/forgot', { email });
          setVerifyEmail(email);
          setVerificationLabel('reset_password');
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error sending reset email:", error);
          const errorMessage = error.response?.data?.message || "Error sending reset email";
          return { success: false, message: errorMessage };
        }
      },

      // Login function
      login: async (credentials) => {
        const { setLoading, setUser, setToken, setVerificationLabel, sendOtp } = get();
        setLoading(true);
        try {
          await axios.get(`${import.meta.env.VITE_BASE_API}/sanctum/csrf-cookie`);
          const response = await api.post('/users/login', credentials);
          
          if (response.data.data?.user?.email_verified_at == null) {
            setVerificationLabel('verify_email');
            const result = await sendOtp({ 
              email: response.data.data.user.email, 
              label: 'verify_email' 
            });
            if (!result.success) {
              toast.error(result.message);
              setLoading(false);
              return;
            }
          } else {
            setUser(response.data.data.user);
            setToken(response.data.data.token);
          }
          
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message,
            isVerified: response.data.data?.user?.email_verified_at == null ? false : true
          };
        } catch (error) {
          setLoading(false);
          console.error("Error logging in user:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
        }
      },

      // Logout function
      logout: async () => {
        const { setLoading, setError, clearAuth, token } = get();
        setLoading(true);
        try {
          if (token) {
            await api.post('/users/logout');
          }
        } catch (err) {
          console.error('Logout error:', err);
          setError(err.response?.data?.message || 'Logout failed');
        } finally {
          setLoading(false);
          clearAuth();
          return { success: true, message: 'Logged out successfully' };
        }
      },

      // Fetch user function
      fetchUser: async () => {
        const { setLoading, setUser, setError } = get();
        setLoading(true);
        console.log("fetching user...");
        try {
          const response = await api.get('/users/user');
          setUser(response.data.user);
          return response.data.user;
        } catch (err) {
          setUser(null);
          setError('User not authenticated');
          throw err;
        } finally {
          setLoading(false);
        }
      },

      // Update UPI ID function
      updateUpiId: async (newUpiId) => {
        const { setLoading, fetchUser } = get();
        try {
          setLoading(true);
          const response = await api.post('/users/update/upi', {
            upi_id: newUpiId
          });
          await fetchUser();
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error updating UPI:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
        }
      },

      // Send OTP function
      sendOtp: async (body) => {
        const { setLoading, setVerifyEmail } = get();
        try {
          setLoading(true);
          const response = await api.post('/users/otp/send', body);
          setVerifyEmail(body.email);
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error sending OTP:", error);
          const errorMessage = error.response?.data?.message || "Error sending OTP";
          return { success: false, message: errorMessage };
        }
      },

      // Verify OTP function
      verifyOtp: async (body) => {
        const { setLoading, setUser, setToken } = get();
        try {
          setLoading(true);
          const response = await api.post('/users/otp/verify', body);
          if (response.data.success) {
            setUser(response.data.data.user);
            setToken(response.data.data.token);
          }
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error verifying OTP:", error);
          const errorMessage = error.response?.data?.message || "Error verifying OTP";
          return { success: false, message: errorMessage };
        }
      },

      // Reset password function
      resetPassword: async (body) => {
        const { setLoading } = get();
        try {
          setLoading(true);
          const response = await api.post('/users/password/reset', body);
          setLoading(false);
          return {
            success: response.data.success,
            message: response.data.message
          };
        } catch (error) {
          setLoading(false);
          console.error("Error resetting password:", error);
          const errorMessage = error.response?.data?.message || "Error resetting password";
          return { success: false, message: errorMessage };
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      }), // only persist token and user
    }
  )
);

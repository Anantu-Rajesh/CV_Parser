/**
 * SIGNUP PAGE
 * ===========
 * User registration page with modern gradient design
 * 
 * Features:
 * - Animated gradient background
 * - Form validation
 * - Responsive design
 * - Loading states
 * - Error handling
 * - Password strength indicator
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo(transparent).png';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any signup
      localStorage.setItem('auth', 'true');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navbar with Logo */}
      <nav className="relative z-30 bg-gray-900/30 dark:bg-black/30 backdrop-blur-md border-b border-gray-700/30">
        <div className="px-6 py-4">
          <img 
            src={logo} 
            alt="EwandzDigital" 
            className="h-10 w-40 drop-shadow-2xl"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {/* Signup Card */}
        <div className="w-full max-w-md animate-fadeInScale relative z-10">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-300">
              Join us and start your journey
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50 dark:border-gray-800/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm animate-fadeInUp">
                  {error}
                </div>
              )}

              {/* Full Name Input */}
              <div className="animate-fadeInUp">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-200 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 dark:bg-gray-950/50 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 dark:bg-gray-950/50 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 dark:bg-gray-950/50 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 dark:bg-gray-950/50 border border-gray-700 dark:border-gray-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start text-sm animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-4 h-4 mt-0.5 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900 mr-2"
                  required
                />
                <label htmlFor="terms" className="text-gray-300 cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Terms and Conditions
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group animate-fadeInUp"
                style={{ animationDelay: '0.5s' }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </span>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-300 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
                Sign in
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <p>© 2025 EwandzDigital. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
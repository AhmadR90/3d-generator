import React from 'react'
import { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function AuthComponent() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', username: '' });

  // Basic validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', username: '' };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    // Username validation (only for signup)
    if (activeTab === 'signup' && username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (activeTab === 'login') {
        console.log('Login submitted:', { email, password });
        // Add your login logic here
      } else {
        console.log('Signup submitted:', { username, email, password });
        // Add your signup logic here
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login initiated');
    // Add your Google login logic here
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 p-4">
      <div className="w-full max-w-md bg-zinc-900 text-white rounded-lg border border-white/10 p-6">
        {/* Header */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold">Welcome to YVO3D</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Sign in or create an account to continue
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-700 mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-tl-lg ${
              activeTab === 'login'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-400'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-tr-lg ${
              activeTab === 'signup'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-400'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                  👤
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 p-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
                  placeholder="johndoe"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                ✉️
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            {activeTab === 'login' ? (
              <>
                <span>🔑</span> Sign In
              </>
            ) : (
              <>
                <span>➕</span> Sign Up
              </>
            )}
          </button>
        </form>

        {/* Magic Link Option (only for login tab) */}
        {activeTab === 'login' && (
          <div className="text-center mt-4">
            <button
              className="text-blue-400 text-sm hover:underline"
              onClick={() => console.log('Magic link option clicked')}
            >
              Sign in with a magic link
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="text-center my-4 text-zinc-400 text-sm">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Icon"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>

    <Footer/>
    </>
  );
}
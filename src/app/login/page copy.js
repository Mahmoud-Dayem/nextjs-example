'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error' | 'warning'
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateSignIn = () => {
    const e = {};
    if (!formData.email) e.email = 'Email is required';
    else if (!validateEmail(formData.email)) e.email = 'Enter a valid email';
    if (!formData.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSignUp = () => {
    const e = {};
    if (!formData.name) e.name = 'Name is required';
    if (!formData.email) e.email = 'Email is required';
    else if (!validateEmail(formData.email)) e.email = 'Enter a valid email';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 6) e.password = 'Password must be 6+ chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: '' }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    // validate depending on mode
    if (isNewUser) {
      if (!validateSignUp()) return;
    } else {
      if (!validateSignIn()) return;
    }

    setIsLoading(true);
    try {
      if (isNewUser) {
        // Sign up flow
        const res = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (res.status === 409 || data.isExisting) {
          // existing user - show message and suggest sign in
          setMessage(data.message || 'Account already exists. Try signing in.');
          setMessageType('warning');
          // optionally switch to sign-in mode:
          // setIsNewUser(false);
        } else if (res.ok) {
          setMessage(data.message || 'Account created');
          setMessageType('success');
          setFormData({ name: '', email: '', password: '' });
          setTimeout(() => router.push('/'), 1200);
        } else {
          setMessage(data.message || 'Unable to create account');
          setMessageType('error');
        }
      } else {
        // Sign in flow - let server validate email & password
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setMessage(data.message || 'Signed in successfully');
          setMessageType('success');
          setTimeout(() => router.push('/'), 800);
        } else {
          // handle invalid credentials or other server hints
          setMessage(data.message || 'Invalid email or password');
          setMessageType('error');
        }
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-md shadow p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isNewUser ? 'Create account' : 'Sign in'}
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              messageType === 'success' ? 'bg-green-50 text-green-700 border border-green-100' :
              messageType === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
              'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isNewUser && (
            <div>
              <label className="sr-only">Full name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Full name"
                className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="sr-only">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Email address"
              className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="sr-only">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Password"
                className={`w-full px-3 py-2 border rounded ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-white ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : (isNewUser ? 'Create account' : 'Sign in')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => { setIsNewUser(!isNewUser); setMessage(''); setErrors({}); }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isNewUser ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>

        <div className="mt-3 text-center">
          <Link href="/">
            <h6 className="text-sm text-gray-600 hover:underline">Back to Home</h6>
          </Link>
        </div>
      </div>
    </div>
  );
}

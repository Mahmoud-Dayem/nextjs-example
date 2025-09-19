'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error' | 'warning'
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

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
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Password"
              className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
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

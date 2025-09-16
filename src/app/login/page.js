'use client';
import { useState } from 'react';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { delay } from '@/utils/delay';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Only for new users
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('User Type:', isNewUser ? 'New User' : 'Existing User');
    
    // Simulate API call with delay
    await delay(2000);
    
    // Navigate to home page after "login"
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme.text.heading.primary}`}>
            {isNewUser ? 'Create an account' : 'Sign in to your account'}
          </h2>
          <p className={`mt-2 text-center text-sm ${theme.text.heading.secondary}`}>
            {isNewUser ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className={`font-medium ${theme.colors.primary.text} ${theme.colors.primary.textHover}`}
            >
              {isNewUser ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isNewUser && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={isNewUser}
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${theme.input.base} ${theme.input.default} sm:text-sm`}
                  placeholder="Full Name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className={`${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover} ${theme.colors.primary.ring}`}
            >
              {isNewUser ? 'Create Account' : 'Sign In'}
            </button>
            <Link 
              href="/"
              className={`w-full ${theme.button.base} ${theme.button.secondary} ${theme.colors.secondary.hover} ${theme.colors.primary.ring}`}
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

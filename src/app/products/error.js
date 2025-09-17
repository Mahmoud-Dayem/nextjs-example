'use client';

import { theme } from '@/styles/theme';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6">
        <h2 className={`text-2xl font-semibold ${theme.text.heading.primary}`}>
          Something went wrong!
        </h2>
        <p className={`${theme.text.heading.secondary}`}>
          {error.message || 'Failed to load products'}
        </p>
        <button
          onClick={reset}
          className={`${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover}`}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
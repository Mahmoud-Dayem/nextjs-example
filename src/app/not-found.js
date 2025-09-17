import Link from 'next/link';
import { theme } from '@/styles/theme';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          {/* 404 Text */}
          <h1 className={`text-9xl font-extrabold ${theme.colors.primary.text}`}>
            404
          </h1>
          
          {/* Error Message */}
          <h2 className={`text-2xl font-semibold ${theme.text.heading.primary}`}>
            Page Not Found
          </h2>
          
          {/* Description */}
          <p className={`text-sm ${theme.text.heading.secondary}`}>
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or return to the homepage.
          </p>

          {/* Back to Home Button */}
          <div className="mt-8">
            <Link 
              href="/"
              className={`${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover} ${theme.colors.primary.ring}`}
            >
              Back to Home
            </Link>
          </div>

          {/* Additional Help Link */}
          <div className="mt-4">
            <Link 
              href="/products" 
              className={`text-sm font-medium ${theme.colors.primary.text} ${theme.colors.primary.textHover}`}
            >
              View Our Products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
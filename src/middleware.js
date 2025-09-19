export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // Protected routes that require authentication
    '/account/:path*',
    '/products/:path*',
    '/recipes/:path*',
  ],
};
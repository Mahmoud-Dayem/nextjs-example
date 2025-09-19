'use client';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleAuthClick = async () => {
        if (session) {
            // If logged in, handle logout
            await signOut({ redirect: false });
            router.push('/'); // Redirect to home after logout
            router.refresh(); // Refresh the page to update the UI
        } else {
            // If not logged in, redirect to login page
            router.push('/login');
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            Logo
                        </Link>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="hidden sm:flex sm:space-x-4">
                        <Link 
                            href="/"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Home
                        </Link>
                        <Link 
                            href="/products"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Products
                        </Link>
                        <Link 
                            href="/recipes"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Recipes
                        </Link>
                        <Link 
                            href="/about"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            About
                        </Link>
                    </div>

                    {/* Auth Button */}
                    <div className="flex items-center gap-4">
                        {session && (
                            <span className="text-sm text-gray-700">
                                Welcome, {session.user.name || session.user.email}
                            </span>
                        )}
                        <button
                            onClick={handleAuthClick}
                            className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                            {session ? 'Logout' : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
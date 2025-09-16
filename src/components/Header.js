'use client';
import Link from 'next/link';
import { useRouter } from "next/navigation"; // for Next.js 13+

const Header = () => {
    const router = useRouter();

    const handleLogin = () => {
        console.log('button clicked');
        router.push('/login')

    }
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
                        <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Home
                        </button>
                        <Link 
                        href={'/products'}
                        
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            Products
                        </Link>
                        <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                            About
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="flex items-center">
                        <button
                            onClick={handleLogin}
                            className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
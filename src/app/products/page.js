import { theme } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function ServerSidePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Button */}
        <div className="mb-8">
          <Link 
            href="/"
            className={`inline-flex items-center ${theme.button.base} ${theme.button.secondary} ${theme.colors.secondary.hover} gap-2`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold ${theme.text.heading.primary}`}>
            Our Products
          </h1>
          <p className={`mt-2 ${theme.text.heading.secondary}`}>
            Server-side rendered product listing
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 block"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 border-t space-y-4">
                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className={`${theme.text.heading.primary} font-semibold text-lg truncate`}>
                    {product.title}
                  </h3>
                  <p className={`${theme.text.heading.secondary} text-sm line-clamp-2`}>
                    {product.description}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <span className={`text-xs ${theme.text.heading.secondary} bg-gray-100 px-2 py-1 rounded-full`}>
                    {product.category}
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`${theme.colors.primary.text} text-xl font-bold`}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      className={`${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover} px-4 py-2 text-sm min-w-[120px]`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

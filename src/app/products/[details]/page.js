import { theme } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const product = await res.json();
  if (!product) {
    notFound();
  }

  return product;
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.details);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products"
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
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:flex-shrink-0 md:w-1/2 p-8 flex items-center justify-center bg-white">
              <div className="relative h-[400px] w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:w-1/2">
              {/* Category */}
              <div className="mb-4">
                <span className={`inline-block ${theme.text.heading.secondary} bg-gray-100 px-3 py-1 rounded-full text-sm`}>
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-3xl font-bold ${theme.text.heading.primary} mb-4`}>
                {product.title}
              </h1>

              {/* Price */}
              <div className={`text-3xl font-bold ${theme.colors.primary.text} mb-6`}>
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className={`${theme.text.heading.secondary} mb-8 text-lg leading-relaxed`}>
                {product.description}
              </p>

              {/* Add to Cart Button */}
              <button
                className={`w-full ${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover} text-lg py-3`}
              >
                Add to Cart
              </button>

              {/* Rating */}
              <div className="mt-6 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                <span className={`ml-2 ${theme.text.heading.secondary}`}>
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
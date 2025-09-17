import { theme } from '@/styles/theme';

export default function Loading() {
  // Create an array of 8 items to show skeleton cards
  const skeletonCards = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 w-48 mx-auto bg-gray-200 rounded-md animate-pulse" />
          <div className="h-4 w-64 mx-auto mt-3 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skeletonCards.map((index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="h-48 w-full bg-gray-200 animate-pulse" />

              {/* Content Skeleton */}
              <div className="p-4 border-t space-y-4">
                {/* Title and Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* Category Skeleton */}
                <div>
                  <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                </div>

                {/* Price and Button Skeleton */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-7 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Product Details Skeleton */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Skeleton */}
            <div className="md:flex-shrink-0 md:w-1/2 p-8">
              <div className="h-[400px] w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="p-8 md:w-1/2 space-y-6">
              {/* Category Skeleton */}
              <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />

              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Price Skeleton */}
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Button Skeleton */}
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />

              {/* Rating Skeleton */}
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
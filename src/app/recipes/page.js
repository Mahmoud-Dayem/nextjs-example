'use client';

import { theme } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <LoadingUI />;
  }

  if (error) {
    return <ErrorUI error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
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

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold ${theme.text.heading.primary}`}>
            Delicious Recipes
          </h1>
          <p className={`mt-2 ${theme.text.heading.secondary}`}>
            Discover our collection of mouth-watering dishes
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link
              key={recipe.idMeal}
              href={`/recipes/${recipe.idMeal}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className={`${theme.text.heading.primary} font-semibold text-xl mb-2 group-hover:text-blue-600 transition-colors`}>
                  {recipe.strMeal}
                </h3>
                <p className={`${theme.text.heading.secondary} text-sm mb-4`}>
                  {recipe.strCategory} • {recipe.strArea}
                </p>
                <div className="flex items-center text-sm">
                  <span className={`${theme.colors.primary.text} font-medium`}>
                    View Recipe →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingUI() {
  // Create an array of 6 items for skeleton cards
  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-8 w-48 mx-auto bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 mx-auto mt-3 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Recipe Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonCards.map((index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 w-full bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorUI({ error }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-2xl font-semibold ${theme.text.heading.primary} mb-4`}>
            Oops! Something went wrong
          </h2>
          <p className={`${theme.text.heading.secondary} mb-8`}>
            {error}
          </p>
          <Link
            href="/"
            className={`${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover}`}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

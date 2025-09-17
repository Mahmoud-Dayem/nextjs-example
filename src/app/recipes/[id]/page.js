'use client';

import { theme } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { use } from 'react';

export default function RecipeDetails({ params }) {
  const resolvedParams = use(params);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${resolvedParams.id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        if (!data.meals?.[0]) throw new Error('Recipe not found');
        setRecipe(data.meals[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [resolvedParams.id]);

  if (loading) {
    return <LoadingUI />;
  }

  if (error) {
    return <ErrorUI error={error} />;
  }

  // Get non-null ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/recipes"
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
            Back to Recipes
          </Link>
        </div>

        {/* Recipe Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="relative h-[400px] w-full">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm font-semibold mb-1">
                {recipe.strCategory} • {recipe.strArea}
              </div>
              <h1 className={`${theme.text.heading.primary} text-3xl font-bold mb-4`}>
                {recipe.strMeal}
              </h1>
              
              {/* Tags */}
              {recipe.strTags && (
                <div className="mb-6">
                  {recipe.strTags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block ${theme.text.heading.secondary} bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2`}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Ingredients */}
              <div className="mb-6">
                <h2 className={`${theme.text.heading.primary} text-xl font-semibold mb-3`}>
                  Ingredients
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className={theme.text.heading.secondary}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h2 className={`${theme.text.heading.primary} text-xl font-semibold mb-3`}>
                  Instructions
                </h2>
                <div className={`${theme.text.heading.secondary} space-y-4`}>
                  {recipe.strInstructions.split('\r\n').filter(Boolean).map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>

              {/* Video Tutorial */}
              {recipe.strYoutube && (
                <div className="mt-6">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center ${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover} gap-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12.796l-4.168-2.779A.5.5 0 005 10.5v-5a.5.5 0 00-.832-.374l-4 3a.5.5 0 000 .748l4 3A.5.5 0 005 11.5v-5a.5.5 0 01.832-.374L10 8.796z" />
                    </svg>
                    Watch Video Tutorial
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingUI() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Skeleton */}
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="h-[400px] bg-gray-200 animate-pulse" />
            </div>

            {/* Content Skeleton */}
            <div className="p-8 md:w-1/2 space-y-6">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
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
            href="/recipes"
            className={`${theme.button.base} ${theme.button.primary} ${theme.colors.primary.main} ${theme.colors.primary.hover}`}
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
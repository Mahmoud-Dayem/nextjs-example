import { theme } from '@/styles/theme';
import { delay } from '@/utils/delay';

export default async function Loading() {
  // Add a 2-second delay
  await delay(2000);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="space-y-6 text-center">
        <div className="relative">
          <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${theme.colors.primary.border}`}></div>
        </div>
        <div className={`text-lg font-semibold ${theme.text.heading.secondary}`}>
          Loading...
        </div>
      </div>
    </div>
  );
}
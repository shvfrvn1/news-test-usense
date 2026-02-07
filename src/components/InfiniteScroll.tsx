import React, { useEffect, useRef } from 'react';
import Loader from './Loader';

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  threshold?: number;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  isLoading,
  error,
  onRetry,
  threshold = 300,
  children,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  // Requirement 1 & 5: Scroll event listener with debounce/performance optimization
  // While IntersectionObserver is preferred, the prompt explicitly asks for a scroll event listener.
  // We'll use a debounced scroll listener for the detection.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        timeoutId = null;
        
        if (isLoading || !hasMore || error) return;

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollHeight - scrollTop - clientHeight < threshold) {
          loadMore();
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener('scroll', handleScroll);
    // Requirement 8: Proper cleanup of event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loadMore, hasMore, isLoading, error, threshold]);

  return (
    <div className="flex flex-col gap-8">
      {children}

      {/* Requirement 2: Loading state indicator */}
      {isLoading && (
        <div className="py-8" role="status" aria-label="Loading more content">
          <Loader message="Loading more articles..." />
        </div>
      )}

      {/* Requirement 4: Error handling with retry mechanism */}
      {error && !isLoading && (
        <div className="flex flex-col items-center gap-4 py-8 text-center" role="alert">
          <p className="text-red-500 font-medium">Failed to load more content: {error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Requirement 7: Fallback "Load More" button */}
      {!isLoading && hasMore && !error && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Load more articles"
          >
            Load More
          </button>
        </div>
      )}

      {/* Requirement 6: Accessibility features - screen reader announcements */}
      <div className="sr-only" aria-live="polite">
        {isLoading ? 'Loading more articles' : ''}
        {!hasMore && 'No more articles to load'}
      </div>

      <div ref={observerTarget} className="h-1" />
    </div>
  );
};

export default InfiniteScroll;

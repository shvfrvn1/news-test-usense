import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { useNews } from '../hooks/useNews';
import type { GuardianArticle } from '../types/news';

// Mock useNews hook
vi.mock('../hooks/useNews', () => ({
  useNews: vi.fn(),
}));

// Mock VirtualNewsGrid to render items directly for testing
vi.mock('../components/VirtualNewsGrid', () => ({
  default: ({ articles }: { articles: GuardianArticle[] }) => (
    <div data-testid="virtual-grid">
      {articles.map((article) => (
        <div key={article.id}>{article.webTitle}</div>
      ))}
    </div>
  ),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </QueryClientProvider>
);

describe('Home Page Infinite Scroll Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load more content when scrolling to bottom', async () => {
    const fetchNextPage = vi.fn();
    (useNews as Mock).mockReturnValue({
      news: [{ id: '1', webTitle: 'News 1' } as GuardianArticle, { id: '2', webTitle: 'News 2' } as GuardianArticle],
      loading: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      error: null,
      fetchNextPage,
      refetch: vi.fn(),
    });

    render(<Home />, { wrapper });

    expect(screen.getByText('News 1')).toBeInTheDocument();
    expect(screen.getByText('News 2')).toBeInTheDocument();

    // Simulate scroll to bottom
    vi.useFakeTimers();
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 800, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 100, configurable: true });

    fireEvent.scroll(window);
    vi.advanceTimersByTime(100);

    expect(fetchNextPage).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should show loader while fetching next page', () => {
    (useNews as Mock).mockReturnValue({
      news: [{ id: '1', webTitle: 'News 1' } as GuardianArticle],
      loading: false,
      isFetchingNextPage: true,
      hasNextPage: true,
      error: null,
      fetchNextPage: vi.fn(),
      refetch: vi.fn(),
    });

    render(<Home />, { wrapper });

    expect(screen.getAllByText(/loading more articles/i).length).toBeGreaterThan(0);
  });

  it('should show error and allow retry if request fails', () => {
    const fetchNextPage = vi.fn();
    (useNews as Mock).mockReturnValue({
      news: [{ id: '1', webTitle: 'News 1' } as GuardianArticle],
      loading: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      error: 'Network Error',
      fetchNextPage,
      refetch: vi.fn(),
    });

    render(<Home />, { wrapper });

    expect(screen.getByText(/failed to load more content: Network Error/i)).toBeInTheDocument();
    
    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);
    
    expect(fetchNextPage).toHaveBeenCalled();
  });
});

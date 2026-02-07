import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InfiniteScroll from './InfiniteScroll';

describe('InfiniteScroll', () => {
  const defaultProps = {
    loadMore: vi.fn(),
    hasMore: true,
    isLoading: false,
    error: null,
    onRetry: vi.fn(),
    threshold: 300,
    children: <div>Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<InfiniteScroll {...defaultProps} />);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('shows loader when isLoading is true', () => {
    render(<InfiniteScroll {...defaultProps} isLoading={true} />);
    // Check for the visual loader text
    expect(screen.getAllByText(/loading more articles/i).length).toBeGreaterThan(0);
    // Check for the ARIA status role
    expect(screen.getByRole('status', { name: /loading more content/i })).toBeInTheDocument();
  });

  it('shows error and retry button when error is present', () => {
    render(<InfiniteScroll {...defaultProps} error="API Error" />);
    expect(screen.getByText(/failed to load more content: API Error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    render(<InfiniteScroll {...defaultProps} error="API Error" />);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(defaultProps.onRetry).toHaveBeenCalled();
  });

  it('shows "Load More" button as a fallback', () => {
    render(<InfiniteScroll {...defaultProps} />);
    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('calls loadMore when "Load More" button is clicked', () => {
    render(<InfiniteScroll {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /load more/i }));
    expect(defaultProps.loadMore).toHaveBeenCalled();
  });

  it('calls loadMore when scrolling near bottom', async () => {
    vi.useFakeTimers();
    render(<InfiniteScroll {...defaultProps} />);
    
    // Mock scroll position
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 650, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 100, configurable: true });
    // 1000 - 650 - 100 = 250, which is < threshold (300)

    fireEvent.scroll(window);
    
    vi.advanceTimersByTime(100); // Advance debounce time
    
    expect(defaultProps.loadMore).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('does not call loadMore when isLoading is true', () => {
    vi.useFakeTimers();
    render(<InfiniteScroll {...defaultProps} isLoading={true} />);
    
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 650, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 100, configurable: true });

    fireEvent.scroll(window);
    vi.advanceTimersByTime(100);
    
    expect(defaultProps.loadMore).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});

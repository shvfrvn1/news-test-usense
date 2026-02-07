import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
const intersectionObserverMock = () => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

// Mock window.scrollTo
window.scrollTo = vi.fn();

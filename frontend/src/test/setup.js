// Test setup file for Vitest
import '@testing-library/jest-dom'

// Mock fetch for API calls
global.fetch = vi.fn()

// Mock EventSource for streaming tests
global.EventSource = vi.fn().mockImplementation(() => ({
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  close: vi.fn(),
  readyState: 1,
  url: '',
  withCredentials: false,
  CONNECTING: 0,
  OPEN: 1,
  CLOSED: 2
}))

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks()
})

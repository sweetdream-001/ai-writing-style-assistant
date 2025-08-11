// Set up our test environment
import '@testing-library/jest-dom'

// Mock the fetch API so we can control responses
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

// Reset mocks between tests
afterEach(() => {
  vi.clearAllMocks()
})

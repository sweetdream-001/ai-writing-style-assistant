import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRephrase } from '../useRephrase'

// Mock the streaming utils
vi.mock('../../utils/streamingUtils', () => ({
  processStreamingResponse: vi.fn(),
  API_ENDPOINTS: {
    REPHRASE: '/api/v1/rephrase',
    REPHRASE_STREAM: '/api/v1/rephrase-stream'
  },
  REQUEST_CONFIG: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}))

describe('useRephrase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('initializes with default state', () => {
    const { result } = renderHook(() => useRephrase())
    
    expect(result.current.input).toBe('')
    expect(result.current.result).toBe(null)
    expect(result.current.error).toBe('')
    expect(result.current.loading).toBe(false)
    expect(result.current.isStreamingMode).toBe(false)
    expect(result.current.isProcessing).toBe(false)
    expect(result.current.disabled).toBe(true)
  })

  it('updates input state', () => {
    const { result } = renderHook(() => useRephrase())
    
    act(() => {
      result.current.setInput('test input')
    })
    
    expect(result.current.input).toBe('test input')
    expect(result.current.disabled).toBe(false)
  })

  it('toggles streaming mode', () => {
    const { result } = renderHook(() => useRephrase())
    
    act(() => {
      result.current.setIsStreamingMode(true)
    })
    
    expect(result.current.isStreamingMode).toBe(true)
  })

  it('handles normal processing success', async () => {
    const mockResponse = {
      professional: 'Professional text',
      casual: 'Casual text',
      polite: 'Polite text',
      social_media: 'Social media text'
    }
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })
    
    const { result } = renderHook(() => useRephrase())
    
    act(() => {
      result.current.setInput('test input')
    })
    
    await act(async () => {
      await result.current.onProcess()
    })
    
    expect(result.current.result).toEqual(mockResponse)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('')
  })

  it('handles processing error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: 'API Error' })
    })
    
    const { result } = renderHook(() => useRephrase())
    
    act(() => {
      result.current.setInput('test input')
    })
    
    await act(async () => {
      await result.current.onProcess()
    })
    
    expect(result.current.error).toBe('API Error')
    expect(result.current.loading).toBe(false)
  })

  it('cancels processing', () => {
    const { result } = renderHook(() => useRephrase())
    
    act(() => {
      result.current.onCancel()
    })
    
    // Should not throw error
    expect(result.current.onCancel).toBeDefined()
  })

  it('resets state when processing starts', async () => {
    const { result } = renderHook(() => useRephrase())
    
    // Set some state
    act(() => {
      result.current.setInput('test input')
      result.current.setIsStreamingMode(true)
    })
    
    // Mock a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ professional: 'test' })
    })
    
    await act(async () => {
      await result.current.onProcess()
    })
    
    // Error should be reset
    expect(result.current.error).toBe('')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { InputSection } from '../features/InputSection'

describe('InputSection', () => {
  const defaultProps = {
    input: '',
    setInput: vi.fn(),
    isStreamingMode: false,
    setIsStreamingMode: vi.fn(),
    onProcess: vi.fn(),
    onCancel: vi.fn(),
    isProcessing: false,
    disabled: false
  }

  it('renders text input field', () => {
    render(<InputSection {...defaultProps} />)
    expect(screen.getByPlaceholderText('Type something to rephrase in different styles...')).toBeInTheDocument()
  })

  it('renders process button', () => {
    render(<InputSection {...defaultProps} />)
    expect(screen.getByText('⚡ Process Text')).toBeInTheDocument()
  })

  it('shows streaming button when in streaming mode', () => {
    render(<InputSection {...defaultProps} isStreamingMode={true} />)
    expect(screen.getByText('🌊 Start Streaming')).toBeInTheDocument()
  })

  it('shows cancel button when processing', () => {
    render(<InputSection {...defaultProps} isProcessing={true} />)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls onProcess when process button is clicked', () => {
    render(<InputSection {...defaultProps} input="test text" />)
    fireEvent.click(screen.getByText('⚡ Process Text'))
    expect(defaultProps.onProcess).toHaveBeenCalled()
  })

  it('calls onCancel when cancel button is clicked', () => {
    render(<InputSection {...defaultProps} isProcessing={true} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(defaultProps.onCancel).toHaveBeenCalled()
  })

  it('disables input when processing', () => {
    render(<InputSection {...defaultProps} isProcessing={true} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('shows character count', () => {
    render(<InputSection {...defaultProps} input="Hello world" />)
    expect(screen.getByText('11 characters')).toBeInTheDocument()
  })
})

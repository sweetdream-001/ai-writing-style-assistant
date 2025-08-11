import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ResultsSection } from '../features/ResultsSection'

describe('ResultsSection', () => {
  const mockResult = {
    professional: 'Hello everyone, let\'s schedule a meeting to discuss AI.',
    casual: 'Hey folks, let\'s catch up on AI stuff.',
    polite: 'Hi all, would you be open to a quick meeting about AI?',
    social_media: 'Yo team! Quick sync on AI?'
  }

  it('renders nothing when no result or error', () => {
    const { container } = render(<ResultsSection />)
    expect(container.firstChild).toBeNull()
  })

  it('displays error message when error is provided', () => {
    render(<ResultsSection error="Something went wrong" />)
    expect(screen.getByText('❌ Error')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('displays normal results with all writing styles', () => {
    render(<ResultsSection result={mockResult} isStreamingMode={false} />)
    
    expect(screen.getByText('⚡ Results')).toBeInTheDocument()
    expect(screen.getByText('Professional')).toBeInTheDocument()
    expect(screen.getByText('Casual')).toBeInTheDocument()
    expect(screen.getByText('Polite')).toBeInTheDocument()
    expect(screen.getByText('Social Media')).toBeInTheDocument()
    
    expect(screen.getByText('Hello everyone, let\'s schedule a meeting to discuss AI.')).toBeInTheDocument()
    expect(screen.getByText('Hey folks, let\'s catch up on AI stuff.')).toBeInTheDocument()
    expect(screen.getByText('Hi all, would you be open to a quick meeting about AI?')).toBeInTheDocument()
    expect(screen.getByText('Yo team! Quick sync on AI?')).toBeInTheDocument()
  })

  it('displays streaming results when in streaming mode', () => {
    render(<ResultsSection streamingResult={mockResult} isStreamingMode={true} isActivelyStreaming={true} />)
    
    expect(screen.getByText('🌊 Streaming Results')).toBeInTheDocument()
    expect(screen.getByText('Professional')).toBeInTheDocument()
    expect(screen.getByText('Casual')).toBeInTheDocument()
    expect(screen.getByText('Polite')).toBeInTheDocument()
    expect(screen.getByText('Social Media')).toBeInTheDocument()
  })

  it('shows streaming complete when not actively streaming', () => {
    render(<ResultsSection streamingResult={mockResult} isStreamingMode={true} isActivelyStreaming={false} />)
    
    expect(screen.getByText('🌊 Streaming Complete')).toBeInTheDocument()
    expect(screen.getByText('✅ Streaming completed successfully')).toBeInTheDocument()
  })

  it('shows completion message for normal mode', () => {
    render(<ResultsSection result={mockResult} isStreamingMode={false} />)
    expect(screen.getByText('✅ Processing completed successfully')).toBeInTheDocument()
  })
})

// The main app component - this is where everything comes together
// Handles the overall layout and state management

import { InputSection } from './features/InputSection';
import { ResultsSection } from './features/ResultsSection';
import { useRephrase } from '../hooks/useRephrase';

export function RephraseApp() {
    const {
        // What the user types and what we get back
        input,
        setInput,
        result,
        error,
        isStreamingMode,
        setIsStreamingMode,
        isActivelyStreaming,
        streamingResult,
        
        // Functions to handle user actions
        onProcess,
        onCancel,
        
        // Helper values
        disabled,
        isProcessing
    } = useRephrase();

    return (
        <div className="main-content">
            {/* Premium Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-text">✨ Powered by AI</span>
                    </div>
                    <h1 className="hero-title">
                        Transform Your Writing
                        <span className="hero-gradient"> with Style</span>
                    </h1>
                    <p className="hero-description">
                        Instantly rephrase your text in multiple styles. Professional, casual, polite, 
                        or social media-ready. Your words, perfected by AI.
                    </p>
                    
                    {/* Stats or Features */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">4</span>
                            <span className="stat-label">Writing Styles</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">⚡</span>
                            <span className="stat-label">Instant Results</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">🎯</span>
                            <span className="stat-label">Perfect Tone</span>
                        </div>
                    </div>
                </div>

                {/* Input Section */}
                <div className="input-container">
                    <InputSection
                        input={input}
                        setInput={setInput}
                        isStreamingMode={isStreamingMode}
                        setIsStreamingMode={setIsStreamingMode}
                        onProcess={onProcess}
                        onCancel={onCancel}
                        isProcessing={isProcessing}
                        disabled={disabled}
                    />
                </div>
            </div>

            {/* Results Section */}
            <ResultsSection
                isStreamingMode={isStreamingMode}
                result={result}
                streamingResult={streamingResult}
                isActivelyStreaming={isActivelyStreaming}
                error={error}
            />
        </div>
    );
}

export default RephraseApp;

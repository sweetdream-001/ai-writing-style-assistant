// Main Component: RephraseApp
// Enterprise-level component architecture

import { InputSection } from './features/InputSection';
import { ResultsSection } from './features/ResultsSection';
import { useRephrase } from '../hooks/useRephrase';

export function RephraseApp() {
    const {
        // State
        input,
        setInput,
        result,
        error,
        isStreamingMode,
        setIsStreamingMode,
        isActivelyStreaming,
        streamingResult,
        
        // Actions
        onProcess,
        onCancel,
        
        // Computed
        disabled,
        isProcessing
    } = useRephrase();

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Transform Your Writing Style
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Use AI to rephrase your text in different styles: professional, casual, polite, and social media-friendly.
                    </p>
                </div>

                {/* Input Section */}
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

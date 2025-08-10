// Feature Component: Results Section
// Displays both normal and streaming results

import { Card } from '../ui/Card';
import { StreamingCard } from '../ui/StreamingCard';

export function ResultsSection({ 
    isStreamingMode, 
    result, 
    streamingResult, 
    isActivelyStreaming, 
    error 
}) {
    // Error display
    if (error) {
        return (
            <div style={{ 
                marginTop: 16, 
                padding: 12, 
                background: "#fef2f2", 
                border: "1px solid #fecaca", 
                borderRadius: 8,
                color: "#dc2626"
            }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    ❌ Error
                </div>
                <div>{error}</div>
            </div>
        );
    }

    // Streaming mode results
    if (isStreamingMode && streamingResult) {
        return (
            <div style={{ marginTop: 24 }}>
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 8, 
                    marginBottom: 16 
                }}>
                    <h3 style={{ 
                        margin: 0, 
                        color: "#2563eb", 
                        fontSize: 18, 
                        fontWeight: 600 
                    }}>
                        🌊 {isActivelyStreaming ? "Streaming Results" : "Streaming Complete"}
                    </h3>
                    {isActivelyStreaming && (
                        <div style={{
                            display: "inline-block",
                            width: 8,
                            height: 8,
                            background: "#10b981",
                            borderRadius: "50%",
                            animation: "pulse 2s infinite"
                        }} />
                    )}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {streamingResult.professional && (
                        <StreamingCard 
                            title="Professional" 
                            text={streamingResult.professional} 
                            isStreaming={isActivelyStreaming}
                        />
                    )}
                    {streamingResult.casual && (
                        <StreamingCard 
                            title="Casual" 
                            text={streamingResult.casual} 
                            isStreaming={isActivelyStreaming}
                        />
                    )}
                    {streamingResult.polite && (
                        <StreamingCard 
                            title="Polite" 
                            text={streamingResult.polite} 
                            isStreaming={isActivelyStreaming}
                        />
                    )}
                    {streamingResult.social_media && (
                        <StreamingCard 
                            title="Social Media" 
                            text={streamingResult.social_media} 
                            isStreaming={isActivelyStreaming}
                        />
                    )}
                </div>

                {!isActivelyStreaming && streamingResult && (
                    <div style={{ 
                        marginTop: 12, 
                        padding: 8, 
                        background: "#f0f9ff", 
                        border: "1px solid #bae6fd", 
                        borderRadius: 6,
                        fontSize: 12,
                        color: "#0369a1",
                        textAlign: "center"
                    }}>
                        ✅ Streaming completed successfully
                    </div>
                )}
            </div>
        );
    }

    // Normal mode results
    if (result && !isStreamingMode) {
        return (
            <div style={{ marginTop: 24 }}>
                <h3 style={{ 
                    marginBottom: 16, 
                    color: "#059669", 
                    fontSize: 18, 
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                }}>
                    <span>⚡ Results</span>
                    <span style={{
                        fontSize: 12,
                        background: "#059669",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: 4
                    }}>
                        COMPLETE
                    </span>
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <Card title="Professional" text={result.professional} />
                    <Card title="Casual" text={result.casual} />
                    <Card title="Polite" text={result.polite} />
                    <Card title="Social Media" text={result.social_media} />
                </div>

                <div style={{ 
                    marginTop: 12, 
                    padding: 8, 
                    background: "#f0fdf4", 
                    border: "1px solid #bbf7d0", 
                    borderRadius: 6,
                    fontSize: 12,
                    color: "#166534",
                    textAlign: "center"
                }}>
                    ✅ Processing completed successfully
                </div>
            </div>
        );
    }

    return null;
}

export default ResultsSection;

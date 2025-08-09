import { useRef, useState } from "react";

// Helper function to extract partial style values from incomplete JSON
function extractPartialStyles(buffer) {
    const styles = {};
    
    // Extract professional
    const profMatch = buffer.match(/"professional":\s*"([^"]*)/);
    if (profMatch) styles.professional = profMatch[1];
    
    // Extract casual
    const casualMatch = buffer.match(/"casual":\s*"([^"]*)/);
    if (casualMatch) styles.casual = casualMatch[1];
    
    // Extract polite
    const politeMatch = buffer.match(/"polite":\s*"([^"]*)/);
    if (politeMatch) styles.polite = politeMatch[1];
    
    // Extract social_media
    const socialMatch = buffer.match(/"social_media":\s*"([^"]*)/);
    if (socialMatch) styles.social_media = socialMatch[1];
    
    return Object.keys(styles).length > 0 ? styles : null;
}

export default function Rephrase() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isStreamingMode, setIsStreamingMode] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const [isActivelyStreaming, setIsActivelyStreaming] = useState(false);
    const [streamingResult, setStreamingResult] = useState(null);
    const controllerRef = useRef(null);

    const onProcess = async () => {
        setError("");
        setResult(null);
        setStreamingContent("");
        setStreamingResult(null);

        if (isStreamingMode) {
            // Streaming mode implementation
            setIsActivelyStreaming(true);
            const controller = new AbortController();
            controllerRef.current = controller;

            try {
                const res = await fetch("http://localhost:8000/api/rephrase-stream", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: input }),
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Streaming request failed");
                }

                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6); // Remove 'data: ' prefix
                            if (data.trim()) {
                                buffer += data;
                                setStreamingContent(buffer);
                                
                                // Try to parse partial JSON and extract style values
                                try {
                                    const parsed = JSON.parse(buffer);
                                    setStreamingResult({
                                        professional: parsed.professional || "",
                                        casual: parsed.casual || "",
                                        polite: parsed.polite || "",
                                        social_media: parsed.social_media || ""
                                    });
                                } catch {
                                    // Partial JSON, extract what we can
                                    const partial = extractPartialStyles(buffer);
                                    if (partial) {
                                        setStreamingResult(partial);
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Streaming failed");
                }
            } finally {
                setIsActivelyStreaming(false);
            }
            return;
        }

        // Normal mode processing
        setLoading(true);
        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const res = await fetch("http://localhost:8000/api/rephrase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: input }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const detail = (await res.json().catch(() => ({})))?.detail || "Request failed";
                throw new Error(detail);
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            if (err.name !== "AbortError") setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
            controllerRef.current = null;
        }
    };

    const onCancel = () => {
        controllerRef.current?.abort();
    };

    const disabled = loading || isActivelyStreaming || !input.trim();
    const isProcessing = loading || isActivelyStreaming;

    return (
        <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "system-ui" }}>
            <h1>AI Writing Style Assistant</h1>
            
            {/* Mode Toggle Switch */}
            <div style={{ marginBottom: 16, padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontWeight: 500, color: isStreamingMode ? "#64748b" : "#2563eb" }}>
                        Normal
                    </span>
                    <div 
                        onClick={() => !isProcessing && setIsStreamingMode(!isStreamingMode)}
                        style={{
                            width: 56,
                            height: 28,
                            background: isStreamingMode ? "#2563eb" : "#cbd5e1",
                            borderRadius: 14,
                            position: "relative",
                            cursor: isProcessing ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s",
                            opacity: isProcessing ? 0.5 : 1
                        }}
                    >
                        <div style={{
                            width: 24,
                            height: 24,
                            background: "white",
                            borderRadius: 12,
                            position: "absolute",
                            top: 2,
                            left: isStreamingMode ? 30 : 2,
                            transition: "left 0.2s",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }} />
                    </div>
                    <span style={{ fontWeight: 500, color: isStreamingMode ? "#2563eb" : "#64748b" }}>
                        Streaming
                    </span>
                </div>
                <div style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>
                    {isStreamingMode 
                        ? "🌊 Real-time streaming mode (coming next step)" 
                        : "⚡ Standard processing mode"
                    }
                </div>
            </div>

            <textarea
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something…"
                style={{ width: "100%", padding: 12, fontSize: 16 }}
                disabled={isProcessing}
            />
            
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button 
                    onClick={onProcess} 
                    disabled={disabled} 
                    style={{ 
                        padding: "8px 16px", 
                        background: isProcessing ? "#cbd5e1" : (isStreamingMode ? "#2563eb" : "#059669"),
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: disabled ? "not-allowed" : "pointer",
                        fontWeight: 500
                    }}
                >
                    {isProcessing 
                        ? (isStreamingMode ? "Streaming…" : "Processing…")
                        : (isStreamingMode ? "Start Streaming" : "Process")
                    }
                </button>
                
                {isProcessing && (
                    <button 
                        onClick={onCancel} 
                        style={{ 
                            padding: "8px 16px",
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>

            {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

            {/* Streaming Mode Results - Show only boxes with content */}
            {isStreamingMode && streamingResult && (
                <div style={{ marginTop: 16 }}>
                    <h3 style={{ marginBottom: 12, color: "#2563eb" }}>
                        🌊 {isActivelyStreaming ? "Streaming..." : "Streaming Complete"}
                    </h3>
                    <div style={{ display: "grid", gap: 12 }}>
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
                                title="Social-media" 
                                text={streamingResult.social_media} 
                                isStreaming={isActivelyStreaming}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Normal Mode Results */}
            {result && !isStreamingMode && (
                <div style={{ marginTop: 16 }}>
                    <h3 style={{ marginBottom: 12, color: "#059669" }}>⚡ Results:</h3>
                    <div style={{ display: "grid", gap: 12 }}>
                        <Card title="Professional" text={result.professional} />
                        <Card title="Casual" text={result.casual} />
                        <Card title="Polite" text={result.polite} />
                        <Card title="Social-media" text={result.social_media} />
                    </div>
                </div>
            )}


        </div>
    );
}

function Card({ title, text }) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{title}</div>
            <div>{text}</div>
        </div>
    );
}

function StreamingCard({ title, text, isStreaming }) {
    return (
        <div style={{ 
            border: "2px solid #2563eb", 
            borderRadius: 8, 
            padding: 12,
            background: "#f8fafc"
        }}>
            <div style={{ fontWeight: 600, marginBottom: 6, color: "#2563eb" }}>
                🌊 {title}
            </div>
            <div>
                {text}
                {isStreaming && text && (
                    <span style={{ 
                        animation: "blink 1s infinite",
                        color: "#2563eb"
                    }}>|</span>
                )}
            </div>
        </div>
    );
}

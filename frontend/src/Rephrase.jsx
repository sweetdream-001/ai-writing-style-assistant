import { useRef, useState } from "react";

export default function Rephrase() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isStreamingMode, setIsStreamingMode] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const [isActivelyStreaming, setIsActivelyStreaming] = useState(false);
    const controllerRef = useRef(null);

    const onProcess = async () => {
        setError("");
        setResult(null);
        setStreamingContent("");

        if (isStreamingMode) {
            // Future: Streaming mode will be implemented here
            setIsActivelyStreaming(true);
            // For now, show a placeholder
            setError("Streaming mode will be implemented in the next step");
            setIsActivelyStreaming(false);
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

            {/* Future: Streaming Progress Display */}
            {isActivelyStreaming && streamingContent && (
                <div style={{ marginTop: 16 }}>
                    <h3 style={{ marginBottom: 8, color: "#2563eb" }}>🌊 Streaming Response:</h3>
                    <div style={{ 
                        border: "2px solid #2563eb", 
                        borderRadius: 8, 
                        padding: 12, 
                        background: "#f8fafc",
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        minHeight: 60
                    }}>
                        {streamingContent}
                        <span style={{ 
                            animation: "blink 1s infinite",
                            color: "#2563eb"
                        }}>|</span>
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

            {/* Streaming Mode Results (when complete) */}
            {result && isStreamingMode && (
                <div style={{ marginTop: 16 }}>
                    <h3 style={{ marginBottom: 12, color: "#2563eb" }}>🌊 Streaming Complete:</h3>
                    <div style={{ display: "grid", gap: 12 }}>
                        <StreamingCard title="Professional" text={result.professional} />
                        <StreamingCard title="Casual" text={result.casual} />
                        <StreamingCard title="Polite" text={result.polite} />
                        <StreamingCard title="Social-media" text={result.social_media} />
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

function StreamingCard({ title, text }) {
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
            <div>{text}</div>
        </div>
    );
}

// UI Component: StreamingCard
// Specialized card for displaying streaming content with visual indicators

export function StreamingCard({ title, text, isStreaming, className = "" }) {
    return (
        <div 
            className={`border-2 border-blue-600 rounded-lg p-3 bg-blue-50 ${className}`}
            style={{ 
                border: "2px solid #2563eb", 
                borderRadius: 8, 
                padding: 12,
                background: "#f8fafc"
            }}
        >
            <div style={{ 
                fontWeight: 600, 
                marginBottom: 6, 
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                gap: 8
            }}>
                <span>🌊</span>
                <span>{title}</span>
                {isStreaming && (
                    <span style={{ 
                        fontSize: 12, 
                        background: "#2563eb", 
                        color: "white", 
                        padding: "2px 6px", 
                        borderRadius: 4 
                    }}>
                        LIVE
                    </span>
                )}
            </div>
            <div style={{ color: "#374151", lineHeight: 1.5 }}>
                {text}
                {isStreaming && text && (
                    <span style={{ 
                        animation: "blink 1s infinite",
                        color: "#2563eb",
                        fontWeight: "bold",
                        marginLeft: 2
                    }}>|</span>
                )}
            </div>
        </div>
    );
}

export default StreamingCard;

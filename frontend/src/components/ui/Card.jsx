// UI Component: Card
// Reusable card component for displaying content

export function Card({ title, text, className = "" }) {
    return (
        <div 
            className={`border border-gray-200 rounded-lg p-3 ${className}`}
            style={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: 8, 
                padding: 12 
            }}
        >
            <div style={{ fontWeight: 600, marginBottom: 6, color: "#374151" }}>
                {title}
            </div>
            <div style={{ color: "#6b7280", lineHeight: 1.5 }}>
                {text}
            </div>
        </div>
    );
}

export default Card;

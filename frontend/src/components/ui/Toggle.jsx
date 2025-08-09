// UI Component: Toggle Switch
// Professional toggle switch component

export function Toggle({ 
    enabled, 
    onChange, 
    disabled = false, 
    leftLabel, 
    rightLabel,
    description,
    className = "" 
}) {
    return (
        <div className={`p-4 bg-gray-50 rounded-lg border border-gray-200 ${className}`}
             style={{ 
                padding: 16, 
                background: "#f8fafc", 
                borderRadius: 8, 
                border: "1px solid #e2e8f0" 
             }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {leftLabel && (
                    <span style={{ 
                        fontWeight: 500, 
                        color: enabled ? "#64748b" : "#2563eb",
                        transition: "color 0.2s"
                    }}>
                        {leftLabel}
                    </span>
                )}
                
                <div 
                    onClick={() => !disabled && onChange(!enabled)}
                    style={{
                        width: 56,
                        height: 28,
                        background: enabled ? "#2563eb" : "#cbd5e1",
                        borderRadius: 14,
                        position: "relative",
                        cursor: disabled ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s ease",
                        opacity: disabled ? 0.5 : 1,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    <div style={{
                        width: 24,
                        height: 24,
                        background: "white",
                        borderRadius: 12,
                        position: "absolute",
                        top: 2,
                        left: enabled ? 30 : 2,
                        transition: "left 0.2s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }} />
                </div>
                
                {rightLabel && (
                    <span style={{ 
                        fontWeight: 500, 
                        color: enabled ? "#2563eb" : "#64748b",
                        transition: "color 0.2s"
                    }}>
                        {rightLabel}
                    </span>
                )}
            </div>
            
            {description && (
                <div style={{ 
                    marginTop: 8, 
                    fontSize: 14, 
                    color: "#64748b",
                    lineHeight: 1.4
                }}>
                    {description}
                </div>
            )}
        </div>
    );
}

export default Toggle;

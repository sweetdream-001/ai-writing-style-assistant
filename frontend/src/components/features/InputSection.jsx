// Feature Component: Input Section
// Handles text input and mode selection

import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';

export function InputSection({ 
    input, 
    setInput, 
    isStreamingMode, 
    setIsStreamingMode, 
    onProcess, 
    onCancel, 
    isProcessing, 
    disabled 
}) {
    return (
        <div style={{ marginBottom: 24 }}>
            {/* Mode Toggle */}
            <Toggle
                enabled={isStreamingMode}
                onChange={setIsStreamingMode}
                disabled={isProcessing}
                leftLabel="Normal"
                rightLabel="Streaming"
                description={isStreamingMode 
                    ? "🌊 Real-time streaming mode - see results as they generate" 
                    : "⚡ Standard processing mode - get complete results at once"
                }
                className="mb-4"
                style={{ marginBottom: 16 }}
            />

            {/* Text Input */}
            <div style={{ marginBottom: 12 }}>
                <label style={{ 
                    display: "block", 
                    fontSize: 14, 
                    fontWeight: 500, 
                    color: "#374151",
                    marginBottom: 6
                }}>
                    Your text to rephrase:
                </label>
                <textarea
                    rows={4}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type something to rephrase in different styles..."
                    disabled={isProcessing}
                    style={{ 
                        width: "100%", 
                        padding: 12, 
                        fontSize: 16,
                        border: "2px solid #e5e7eb",
                        borderRadius: 8,
                        resize: "vertical",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s ease",
                        background: isProcessing ? "#f9fafb" : "white"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#2563eb"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
                <div style={{ 
                    fontSize: 12, 
                    color: "#6b7280", 
                    marginTop: 4,
                    textAlign: "right"
                }}>
                    {input.length} characters
                </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Button 
                    onClick={onProcess} 
                    disabled={disabled} 
                    variant={isStreamingMode ? "streaming" : "primary"}
                    size="md"
                >
                    {isProcessing 
                        ? (isStreamingMode ? "🌊 Streaming…" : "⚡ Processing…")
                        : (isStreamingMode ? "🌊 Start Streaming" : "⚡ Process Text")
                    }
                </Button>
                
                {isProcessing && (
                    <Button 
                        onClick={onCancel} 
                        variant="danger"
                        size="md"
                    >
                        Cancel
                    </Button>
                )}

                {!isProcessing && input.trim() && (
                    <span style={{ 
                        fontSize: 12, 
                        color: "#059669", 
                        fontWeight: 500 
                    }}>
                        Ready to process
                    </span>
                )}
            </div>
        </div>
    );
}

export default InputSection;

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
        <div className="space-y-6">
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

            />

            {/* Text Input */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Your text to rephrase:
                    <textarea
                        id="text-input"
                        name="textInput"
                        rows={4}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type something to rephrase in different styles..."
                        disabled={isProcessing}
                        autoComplete="off"
                        className={`
                            w-full px-4 py-3 text-sm sm:text-base 
                            border-2 border-gray-200 rounded-lg 
                            resize-vertical transition-all duration-200
                            focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-opacity-20
                            disabled:bg-gray-50 disabled:text-gray-500
                            placeholder-gray-400 mt-2
                        `}
                    />
                </label>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Use clear, natural language for best results</span>
                    <span className="tabular-nums">
                        {input.length} characters
                    </span>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                <Button 
                    onClick={onProcess} 
                    disabled={disabled} 
                    variant={isStreamingMode ? "streaming" : "primary"}
                    size="lg"
                    className="w-full sm:w-auto"
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
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                )}

                {!isProcessing && input.trim() && (
                    <div className="flex items-center justify-center sm:justify-start">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                            Ready to process
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputSection;

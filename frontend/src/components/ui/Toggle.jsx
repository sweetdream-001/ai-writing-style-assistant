// A simple toggle switch component
// Used for switching between regular and streaming modes

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
        <div className={`p-4 bg-gray-50 rounded-lg border border-gray-200 ${className}`}>
            <div className="flex items-center gap-3">
                {leftLabel && (
                    <span className={`font-medium text-sm transition-colors duration-200 ${
                        enabled ? 'text-gray-500' : 'text-blue-600'
                    }`}>
                        {leftLabel}
                    </span>
                )}
                
                <button
                    type="button"
                    onClick={() => !disabled && onChange(!enabled)}
                    disabled={disabled}
                    className={`
                        relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        ${enabled ? 'bg-blue-600' : 'bg-gray-300'}
                    `}
                >
                    <span
                        className={`
                            inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
                            ${enabled ? 'translate-x-7' : 'translate-x-0.5'}
                        `}
                    />
                </button>
                
                {rightLabel && (
                    <span className={`font-medium text-sm transition-colors duration-200 ${
                        enabled ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                        {rightLabel}
                    </span>
                )}
            </div>
            
            {description && (
                <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {description}
                </div>
            )}
        </div>
    );
}

export default Toggle;

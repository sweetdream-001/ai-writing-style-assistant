// A reusable button component
// Handles different styles and states

export function Button({ 
    children, 
    onClick, 
    disabled = false, 
    variant = "primary", 
    size = "md",
    className = "",
    ...props 
}) {
    const getVariantClasses = () => {
        const base = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
        
        switch (variant) {
            case "primary":
                return `${base} bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed`;
            case "streaming":
                return `${base} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed`;
            case "danger":
                return `${base} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed`;
            case "secondary":
                return `${base} bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed`;
            case "outline":
                return `${base} bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed`;
            default:
                return `${base} bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed`;
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case "xs":
                return "px-2.5 py-1.5 text-xs";
            case "sm":
                return "px-3 py-2 text-sm";
            case "md":
                return "px-4 py-2 text-sm sm:text-base";
            case "lg":
                return "px-6 py-3 text-base";
            case "xl":
                return "px-8 py-4 text-lg";
            default:
                return "px-4 py-2 text-sm sm:text-base";
        }
    };

    const classes = `${getVariantClasses()} ${getSizeClasses()} ${className}`;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;

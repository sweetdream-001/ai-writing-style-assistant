// Layout Component: Header
// Enterprise-level header with branding and navigation

export function Header({ connectionStatus, backendMessage }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">AI</span>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Writing Style Assistant
                            </h1>
                            <p className="text-xs text-gray-500">
                                Transform your text with AI-powered rephrasing
                            </p>
                        </div>
                        <div className="sm:hidden">
                            <h1 className="text-lg font-semibold text-gray-900">
                                AI Assistant
                            </h1>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                            Dashboard
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                            History
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                            Settings
                        </a>
                    </nav>

                    {/* Connection Status & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Connection Indicator */}
                        <ConnectionIndicator status={connectionStatus} message={backendMessage} />
                        
                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Connection Status Indicator Component (Responsive Version)
function ConnectionIndicator({ status, message }) {
    const getStatusConfig = () => {
        switch (status) {
            case "connected":
                return {
                    bgColor: "bg-green-100",
                    borderColor: "border-green-500",
                    textColor: "text-green-800",
                    icon: "🟢",
                    text: "Connected",
                    pulse: false
                };
            case "disconnected":
                return {
                    bgColor: "bg-red-100",
                    borderColor: "border-red-500",
                    textColor: "text-red-800",
                    icon: "🔴",
                    text: "Disconnected",
                    pulse: true
                };
            case "checking":
            default:
                return {
                    bgColor: "bg-yellow-100",
                    borderColor: "border-yellow-500",
                    textColor: "text-yellow-800",
                    icon: "🟡",
                    text: "Checking...",
                    pulse: true
                };
        }
    };

    const config = getStatusConfig();

    return (
        <div className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border ${config.bgColor} ${config.borderColor} ${config.textColor}`}>
            <div className={`text-xs ${config.pulse ? 'animate-pulse' : ''}`}>
                {config.icon}
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-medium">{config.text}</span>
                {message && (
                    <span className="text-xs opacity-75 hidden sm:block" style={{ fontSize: '10px' }}>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Header;

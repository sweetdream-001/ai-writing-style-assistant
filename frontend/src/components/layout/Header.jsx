// The top navigation bar
// Shows connection status and app branding

export function Header({ connectionStatus }) {
    return (
        <header className="header-modern">
            <div className="container">
                <div className="header-content">
                    {/* Premium Logo and Brand */}
                    <div className="brand-section">
                        <div className="logo-container">
                            <div className="logo-icon">
                                <svg className="logo-svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#gradient1)" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#gradient2)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#667eea" />
                                            <stop offset="100%" stopColor="#764ba2" />
                                        </linearGradient>
                                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f093fb" />
                                            <stop offset="100%" stopColor="#f5576c" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="brand-text">
                                <h1 className="brand-title">Stylify</h1>
                                <p className="brand-subtitle">AI Writing Assistant</p>
                            </div>
                        </div>
                    </div>

                    {/* Premium Navigation */}
                    <nav className="nav-modern hidden md:flex">
                        <a href="#" className="nav-link nav-link-active">
                            <span className="nav-icon">✦</span>
                            Transform
                        </a>
                        <a href="#" className="nav-link">
                            <span className="nav-icon">⚡</span>
                            History
                        </a>
                        <a href="#" className="nav-link">
                            <span className="nav-icon">⚙</span>
                            Settings
                        </a>
                    </nav>

                    {/* Connection Status & Actions */}
                    <div className="header-actions">
                        {/* Subtle Connection Status */}
                        <StatusIndicator status={connectionStatus} />
                        
                        {/* User Avatar/Menu */}
                        <div className="user-section">
                            <div className="avatar">
                                <span className="avatar-text">U</span>
                            </div>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <button className="mobile-menu-btn md:hidden">
                            <span className="menu-line"></span>
                            <span className="menu-line"></span>
                            <span className="menu-line"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

// Subtle Status Indicator Component
function StatusIndicator({ status }) {
    const getStatusClass = () => {
        switch (status) {
            case "connected":
                return "status-indicator status-connected";
            case "disconnected":
                return "status-indicator status-disconnected";
            case "checking":
            default:
                return "status-indicator status-checking";
        }
    };

    return (
        <div className={getStatusClass()}>
            <div className="status-dot"></div>
            <span className="status-tooltip">
                {status === "connected" ? "Connected" : 
                 status === "disconnected" ? "Disconnected" : "Connecting..."}
            </span>
        </div>
    );
}

export default Header;

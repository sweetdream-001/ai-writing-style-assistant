// Layout Component: Footer
// Clean footer with ONLY TailwindCSS classes

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fillRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Stylify
                            </h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xs mx-auto sm:mx-0">
                            Transform your text with AI-powered style transformation.
                        </p>
                        <div className="flex justify-center sm:justify-start gap-3">
                            <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-200 hover:-translate-y-0.5" aria-label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3 sm:mb-4">
                            Product
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Features</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">API</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Pricing</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Documentation</a></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3 sm:mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Help Center</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Community</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact Us</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Status</a></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3 sm:mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">About</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Blog</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Careers</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Privacy</a></li>
                            <li><a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">Terms</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                            © {currentYear} Stylify. All rights reserved.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-1 sm:order-2">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                <span className="text-sm">⚡</span>
                                Powered by OpenAI
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                <span className="text-sm">🔒</span>
                                Enterprise Secure
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

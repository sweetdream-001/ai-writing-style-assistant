// UI Component: StreamingCard
// Responsive streaming card with copy functionality

import { useState } from 'react';

export function StreamingCard({ title, text, isStreaming, className = "" }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`
            bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6 
            shadow-sm transition-all duration-200 animate-fade-in
            ${isStreaming ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
            ${className}
        `}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <span className="text-blue-500">🌊</span>
                    <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                        {title}
                    </h3>
                </div>
                <div className="flex items-center gap-2">
                    {text && (
                        <button
                            onClick={copyToClipboard}
                            className="p-1.5 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            title={copied ? "Copied!" : "Copy text"}
                        >
                            {copied ? (
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            )}
                        </button>
                    )}
                    {isStreaming ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500 text-white animate-pulse">
                            <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-ping"></span>
                            LIVE
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-600">
                            Complete
                        </span>
                    )}
                </div>
            </div>
            <div className="text-sm sm:text-base text-blue-900 leading-relaxed">
                {text}
                {isStreaming && text && (
                    <span className="inline-block w-0.5 h-4 bg-blue-500 ml-1 animate-pulse"></span>
                )}
            </div>
        </div>
    );
}

export default StreamingCard;

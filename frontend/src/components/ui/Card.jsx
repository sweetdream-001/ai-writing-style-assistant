// UI Component: Card
// Responsive card component with copy functionality

import { useState } from 'react';

export function Card({ title, text, className = "" }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
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
            bg-white border border-gray-200 rounded-lg p-4 sm:p-6 
            shadow-sm hover:shadow-md transition-shadow duration-200
            ${className}
        `}>
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        Complete
                    </span>
                </div>
            </div>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {text}
            </div>
        </div>
    );
}

export default Card;

// Custom Hook: useRephrase
// Manages all rephrase functionality (normal and streaming)

import { useState, useRef } from 'react';
import { processStreamingResponse, API_ENDPOINTS, REQUEST_CONFIG } from '../utils/streamingUtils';

export function useRephrase() {
    // State management
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isStreamingMode, setIsStreamingMode] = useState(false);
    const [streamingContent, setStreamingContent] = useState("");
    const [isActivelyStreaming, setIsActivelyStreaming] = useState(false);
    const [streamingResult, setStreamingResult] = useState(null);
    
    // Refs
    const controllerRef = useRef(null);

    // Reset all states
    const resetState = () => {
        setError("");
        setResult(null);
        setStreamingContent("");
        setStreamingResult(null);
    };

    // Normal processing
    const processNormal = async () => {
        setLoading(true);
        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const res = await fetch(API_ENDPOINTS.REPHRASE, {
                method: "POST",
                ...REQUEST_CONFIG,
                body: JSON.stringify({ text: input }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const detail = (await res.json().catch(() => ({})))?.detail || "Request failed";
                throw new Error(detail);
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
            controllerRef.current = null;
        }
    };

    // Streaming processing
    const processStreaming = async () => {
        setIsActivelyStreaming(true);
        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const res = await fetch(API_ENDPOINTS.REPHRASE_STREAM, {
                method: "POST",
                ...REQUEST_CONFIG,
                body: JSON.stringify({ text: input }),
                signal: controller.signal,
            });

            if (!res.ok) {
                throw new Error("Streaming request failed");
            }

            await processStreamingResponse(
                res,
                ({ buffer, parsed }) => {
                    setStreamingContent(buffer);
                    setStreamingResult(parsed);
                },
                (error) => {
                    if (error.name !== "AbortError") {
                        setError(error.message || "Streaming failed");
                    }
                }
            );
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Streaming failed");
            }
        } finally {
            setIsActivelyStreaming(false);
            controllerRef.current = null;
        }
    };

    // Main process function
    const onProcess = async () => {
        resetState();
        
        if (isStreamingMode) {
            await processStreaming();
        } else {
            await processNormal();
        }
    };

    // Cancel function
    const onCancel = () => {
        controllerRef.current?.abort();
    };

    // Computed values
    const disabled = loading || isActivelyStreaming || !input.trim();
    const isProcessing = loading || isActivelyStreaming;

    return {
        // State
        input,
        setInput,
        result,
        error,
        loading,
        isStreamingMode,
        setIsStreamingMode,
        streamingContent,
        isActivelyStreaming,
        streamingResult,
        
        // Actions
        onProcess,
        onCancel,
        
        // Computed
        disabled,
        isProcessing
    };
}

export default useRephrase;

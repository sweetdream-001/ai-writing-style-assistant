// Our main hook that handles all the rephrasing logic
// Both regular and streaming modes

import { useState, useRef } from 'react';
import { processStreamingResponse, API_ENDPOINTS, REQUEST_CONFIG } from '../utils/streamingUtils';

export function useRephrase() {
    // What the user types
    const [input, setInput] = useState("");
    // The final results we get back
    const [result, setResult] = useState(null);
    // Any errors that happen
    const [error, setError] = useState("");
    // Whether we're currently processing
    const [loading, setLoading] = useState(false);
    // Which mode the user picked
    const [isStreamingMode, setIsStreamingMode] = useState(false);
    // The raw streaming content as it comes in
    const [streamingContent, setStreamingContent] = useState("");
    // Whether we're actively getting streaming data
    const [isActivelyStreaming, setIsActivelyStreaming] = useState(false);
    // The parsed streaming results
    const [streamingResult, setStreamingResult] = useState(null);
    
    // Keep track of our request so we can cancel it
    const controllerRef = useRef(null);

    // Clear everything and start fresh
    const resetState = () => {
        setError("");
        setResult(null);
        setStreamingContent("");
        setStreamingResult(null);
    };

    // Handle regular (non-streaming) requests
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

    // Handle streaming requests (real-time updates)
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

    // The main function that decides which processing method to use
    const onProcess = async () => {
        resetState();
        
        if (isStreamingMode) {
            await processStreaming();
        } else {
            await processNormal();
        }
    };

    // Stop any ongoing requests
    const onCancel = () => {
        controllerRef.current?.abort();
    };

    // Helper values we compute from our state
    const disabled = loading || isActivelyStreaming || !input.trim();
    const isProcessing = loading || isActivelyStreaming;

    return {
        // All our state variables
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
        
        // Functions that change our state
        onProcess,
        onCancel,
        
        // Computed helper values
        disabled,
        isProcessing
    };
}

export default useRephrase;

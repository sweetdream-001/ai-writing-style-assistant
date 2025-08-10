// Utility: Streaming Functions
// Helper functions for handling streaming responses

/**
 * Extract partial style values from incomplete JSON
 * @param {string} buffer - The current buffer content
 * @returns {object|null} - Extracted styles or null
 */
export function extractPartialStyles(buffer) {
    const styles = {};
    
    // Extract professional
    const profMatch = buffer.match(/"professional":\s*"([^"]*)/);
    if (profMatch) styles.professional = profMatch[1];
    
    // Extract casual
    const casualMatch = buffer.match(/"casual":\s*"([^"]*)/);
    if (casualMatch) styles.casual = casualMatch[1];
    
    // Extract polite
    const politeMatch = buffer.match(/"polite":\s*"([^"]*)/);
    if (politeMatch) styles.polite = politeMatch[1];
    
    // Extract social_media
    const socialMatch = buffer.match(/"social_media":\s*"([^"]*)/);
    if (socialMatch) styles.social_media = socialMatch[1];
    
    return Object.keys(styles).length > 0 ? styles : null;
}

/**
 * Process streaming response
 * @param {Response} response - Fetch response object
 * @param {function} onChunk - Callback for each chunk
 * @param {function} onError - Error callback
 */
export async function processStreamingResponse(response, onChunk, onError) {
    try {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6); // Remove 'data: ' prefix
                    if (data.trim()) {
                        buffer += data;
                        
                        // Try to parse complete JSON first
                        try {
                            const parsed = JSON.parse(buffer);
                            onChunk({
                                buffer,
                                parsed: {
                                    professional: parsed.professional || "",
                                    casual: parsed.casual || "",
                                    polite: parsed.polite || "",
                                    social_media: parsed.social_media || ""
                                }
                            });
                        } catch {
                            // Partial JSON, extract what we can
                            const partial = extractPartialStyles(buffer);
                            if (partial) {
                                onChunk({
                                    buffer,
                                    parsed: partial
                                });
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        onError(error);
    }
}

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
    REPHRASE: "http://localhost:8000/api/v1/rephrase",
    REPHRASE_STREAM: "http://localhost:8000/api/v1/rephrase-stream",
    HEALTH: "http://localhost:8000/api/v1/health",
    HELLO: "http://localhost:8000/api/v1/hello",
    VERSION: "http://localhost:8000/api/v1/version",
    STATUS: "http://localhost:8000/api/v1/status"
};

/**
 * Request configuration
 */
export const REQUEST_CONFIG = {
    headers: { "Content-Type": "application/json" },
    timeout: 30000
};

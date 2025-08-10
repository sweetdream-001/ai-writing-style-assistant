# app/api/v1/docs.py
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from app.config import get_settings

router = APIRouter()

@router.get("/docs", response_class=HTMLResponse)
async def api_documentation():
    """Custom API documentation page."""
    settings = get_settings()
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Writing Style Assistant - API Documentation</title>
        <style>
            body {{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: #333;
            }}
            .container {{
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 2.5em;
                font-weight: 300;
            }}
            .header p {{
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 1.1em;
            }}
            .content {{
                padding: 40px;
            }}
            .section {{
                margin-bottom: 40px;
            }}
            .section h2 {{
                color: #667eea;
                border-bottom: 2px solid #667eea;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }}
            .endpoint {{
                background: #f8f9fa;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 20px 0;
                border-radius: 0 8px 8px 0;
            }}
            .method {{
                display: inline-block;
                padding: 4px 12px;
                border-radius: 4px;
                font-weight: bold;
                font-size: 0.9em;
                margin-right: 10px;
            }}
            .get {{ background: #61affe; color: white; }}
            .post {{ background: #49cc90; color: white; }}
            .endpoint-url {{
                font-family: 'Courier New', monospace;
                font-size: 1.1em;
                color: #333;
            }}
            .description {{
                margin-top: 10px;
                color: #666;
            }}
            .example {{
                background: #f1f3f4;
                padding: 15px;
                border-radius: 6px;
                margin-top: 10px;
                font-family: 'Courier New', monospace;
                font-size: 0.9em;
            }}
            .info-box {{
                background: #e3f2fd;
                border: 1px solid #2196f3;
                border-radius: 6px;
                padding: 20px;
                margin: 20px 0;
            }}
            .warning {{
                background: #fff3e0;
                border: 1px solid #ff9800;
                border-radius: 6px;
                padding: 20px;
                margin: 20px 0;
            }}
            .code {{
                background: #f5f5f5;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
                font-size: 0.9em;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>AI Writing Style Assistant</h1>
                <p>API Documentation v{settings.version}</p>
            </div>
            
            <div class="content">
                <div class="section">
                    <h2>📋 Overview</h2>
                    <p>This API allows you to transform text into different writing styles using artificial intelligence. 
                    The API is RESTful and supports both synchronous and streaming responses.</p>
                    
                    <div class="info-box">
                        <strong>Base URL:</strong> <span class="code">http://localhost:8000/api/v1</span><br>
                        <strong>Environment:</strong> <span class="code">{settings.environment}</span><br>
                        <strong>Rate Limit:</strong> {settings.rate_limit_per_minute} requests per minute, {settings.rate_limit_per_hour} per hour
                    </div>
                </div>

                <div class="section">
                    <h2>🔗 Endpoints</h2>
                    
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <span class="endpoint-url">/api/v1/health</span>
                        <div class="description">Check the health status of the API</div>
                        <div class="example">
curl -X GET "http://localhost:8000/api/v1/health"
                        </div>
                    </div>

                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <span class="endpoint-url">/api/v1/version</span>
                        <div class="description">Get detailed API version information and available features</div>
                        <div class="example">
curl -X GET "http://localhost:8000/api/v1/version"
                        </div>
                    </div>

                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <span class="endpoint-url">/api/v1/status</span>
                        <div class="description">Get comprehensive operational status and configuration details</div>
                        <div class="example">
curl -X GET "http://localhost:8000/api/v1/status"
                        </div>
                    </div>

                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <span class="endpoint-url">/api/v1/rephrase</span>
                        <div class="description">Transform text into different writing styles (synchronous)</div>
                        <div class="example">
curl -X POST "http://localhost:8000/api/v1/rephrase" \\
  -H "Content-Type: application/json" \\
  -d '{{"text": "Hello, how are you?"}}'
                        </div>
                    </div>

                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <span class="endpoint-url">/api/v1/rephrase-stream</span>
                        <div class="description">Transform text with real-time streaming response</div>
                        <div class="example">
curl -X POST "http://localhost:8000/api/v1/rephrase-stream" \\
  -H "Content-Type: application/json" \\
  -d '{{"text": "Hello, how are you?"}}'
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h2>📝 Request Format</h2>
                    <p>For rephrasing endpoints, send a JSON payload with the following structure:</p>
                    <div class="example">
{{
  "text": "Your text to rephrase (max 5000 characters)"
}}
                    </div>
                </div>

                <div class="section">
                    <h2>📤 Response Format</h2>
                    <p>The rephrasing endpoints return JSON with four different writing styles:</p>
                    <div class="example">
{{
  "professional": "Formal, business-appropriate version",
  "casual": "Relaxed, conversational version", 
  "polite": "Courteous and respectful version",
  "social_media": "Engaging, platform-optimized version"
}}
                    </div>
                </div>

                <div class="section">
                    <h2>🔒 Authentication & Security</h2>
                    <ul>
                        <li><strong>Rate Limiting:</strong> IP-based throttling to prevent abuse</li>
                        <li><strong>Input Validation:</strong> Comprehensive text validation and sanitization</li>
                        <li><strong>Security Headers:</strong> CSP, HSTS, X-Frame-Options, and more</li>
                        <li><strong>CORS:</strong> Properly configured for web applications</li>
                    </ul>
                </div>

                <div class="section">
                    <h2>🚀 Getting Started</h2>
                    <ol>
                        <li>Test the health endpoint: <span class="code">GET /api/v1/health</span></li>
                        <li>Check API version: <span class="code">GET /api/v1/version</span></li>
                        <li>Try rephrasing text: <span class="code">POST /api/v1/rephrase</span></li>
                        <li>Experiment with streaming: <span class="code">POST /api/v1/rephrase-stream</span></li>
                    </ol>
                </div>

                <div class="warning">
                    <strong>⚠️ Note:</strong> This is a custom documentation page. For interactive API exploration, 
                    use the Swagger UI at <span class="code">/docs</span> in development mode only.
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    return HTMLResponse(content=html_content)

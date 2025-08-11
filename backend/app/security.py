# Security utilities and rate limiting
import time
import asyncio
from collections import defaultdict
from typing import Dict, Tuple
from fastapi import Request, HTTPException

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60, requests_per_hour: int = 1000):
        self.requests_per_minute = requests_per_minute
        self.requests_per_hour = requests_per_hour
        self.minute_requests: Dict[str, list] = defaultdict(list)
        self.hour_requests: Dict[str, list] = defaultdict(list)
        self._lock = asyncio.Lock()
    
    async def is_allowed(self, client_ip: str) -> bool:
        """Check if the client IP is allowed to make a request."""
        async with self._lock:
            current_time = time.time()
            
            # Clean old entries
            self._clean_old_entries(client_ip, current_time)
            
            # Check minute limit
            if len(self.minute_requests[client_ip]) >= self.requests_per_minute:
                return False
            
            # Check hour limit
            if len(self.hour_requests[client_ip]) >= self.requests_per_hour:
                return False
            
            # Add current request
            self.minute_requests[client_ip].append(current_time)
            self.hour_requests[client_ip].append(current_time)
            
            return True
    
    def _clean_old_entries(self, client_ip: str, current_time: float):
        """Remove old entries from the rate limiting windows."""
        # Clean minute window (60 seconds)
        self.minute_requests[client_ip] = [
            req_time for req_time in self.minute_requests[client_ip]
            if current_time - req_time < 60
        ]
        
        # Clean hour window (3600 seconds)
        self.hour_requests[client_ip] = [
            req_time for req_time in self.hour_requests[client_ip]
            if current_time - req_time < 3600
        ]

# Global rate limiter instance with default values
rate_limiter = RateLimiter()

def get_client_ip(request: Request) -> str:
    """Extract client IP address from request, handling proxies."""
    # Check for forwarded headers (common with proxies/load balancers)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # Take the first IP in the chain
        return forwarded_for.split(",")[0].strip()
    
    # Check for real IP header
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    
    # Fallback to direct client IP
    return request.client.host if request.client else "unknown"

def validate_api_key(api_key: str) -> bool:
    """Validate OpenAI API key format."""
    if not api_key:
        return False
    
    # Basic OpenAI API key validation (starts with 'sk-' or 'sk-proj-' and has reasonable length)
    if not (api_key.startswith("sk-") or api_key.startswith("sk-proj-")):
        return False
    
    if len(api_key) < 20 or len(api_key) > 200:
        return False
    
    return True

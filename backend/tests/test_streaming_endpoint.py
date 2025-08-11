#!/usr/bin/env python3
"""
Quick test script for the streaming endpoint.
Make sure the server is running with: make dev
"""
import httpx
import asyncio
import json
import pytest


@pytest.mark.asyncio
async def test_streaming_endpoint():
    """Test the streaming endpoint with httpx."""
    
    test_cases = [
        "Hey guys, let's huddle about AI",
        "I need to finish this project today",
        "Thanks for your help with this issue",
        "Can we schedule a meeting tomorrow?"
    ]
    
    async with httpx.AsyncClient() as client:
        for i, text in enumerate(test_cases, 1):
            print(f"\n🧪 Test {i}: '{text}'")
            print("=" * 60)
            print("Streaming response:")
            
            try:
                async with client.stream(
                    "POST", 
                    "http://localhost:8000/api/v1/rephrase-stream",
                    json={"text": text},
                    timeout=30.0
                ) as response:
                    
                    if response.status_code != 200:
                        print(f"❌ Error: {response.status_code}")
                        continue
                    
                    full_content = ""
                    async for chunk in response.aiter_text():
                        # Remove SSE formatting
                        clean_chunk = chunk.replace("data: ", "").replace("\n\n", "")
                        if clean_chunk:
                            print(clean_chunk, end="", flush=True)
                            full_content += clean_chunk
                    
                    print(f"\n✅ Complete! ({len(full_content)} chars)")
                    
                    # Try to parse final JSON
                    try:
                        result = json.loads(full_content)
                        print("📝 Parsed styles:")
                        for style, rephrased in result.items():
                            print(f"  {style}: {rephrased}")
                    except json.JSONDecodeError:
                        print("⚠️  Not valid JSON (expected during streaming)")
                        
            except Exception as e:
                print(f"❌ Error: {e}")


if __name__ == "__main__":
    print("🌊 Testing streaming endpoint...")
    print("📡 Make sure server is running: make dev")
    
    try:
        asyncio.run(test_streaming_endpoint())
    except KeyboardInterrupt:
        print("\n⏹️  Test interrupted")
    except Exception as e:
        print(f"❌ Error: {e}")
        print("💡 Make sure the server is running with: make dev")

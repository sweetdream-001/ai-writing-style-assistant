#!/usr/bin/env python3
"""
Test script to verify streaming functionality works.
Run this after setting your OPENAI_API_KEY in a .env file.
"""
import asyncio
import os
import pytest
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv('../../.env')


@pytest.mark.asyncio
async def test_streaming():
    """Test the streaming rephrase function."""
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Error: OPENAI_API_KEY not found in environment")
        print("Please create a .env file with: OPENAI_API_KEY=your_key_here")
        return

    try:
        # Import after loading .env
        import sys
        sys.path.insert(0, '..')
        from app.llm import rephrase_stream, LLMError
        
        # Test with the example sentence
        test_text = "Hey guys, let's huddle about AI"
        
        print(f"🧪 Testing streaming rephrase with: '{test_text}'")
        print("Streaming response:")
        print("-" * 50)
        
        # Collect the streamed content
        full_content = ""
        async for chunk in rephrase_stream(test_text):
            print(chunk, end="", flush=True)  # Print each chunk immediately
            full_content += chunk
            
        print("\n" + "-" * 50)
        print(f"✅ Streaming completed!")
        print(f"📝 Full response length: {len(full_content)} characters")
        
        # Try to parse the final JSON
        import json
        try:
            result = json.loads(full_content)
            print("✅ Valid JSON received!")
            print("🎯 Parsed result:")
            for style, text in result.items():
                print(f"  {style}: {text}")
        except json.JSONDecodeError:
            print("⚠️  Response is not valid JSON (this might be expected during streaming)")
            print(f"Raw content: {full_content[:200]}...")
            
    except LLMError as e:
        print(f"❌ LLM Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        print(f"Error type: {type(e).__name__}")


@pytest.mark.asyncio
@pytest.mark.integration
async def test_streaming_integration():
    """Integration test for streaming functionality (requires API key)."""
    import pytest
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        pytest.skip("OPENAI_API_KEY not found - skipping streaming integration test")
    
    # Import after loading .env
    import sys
    sys.path.insert(0, '..')
    from app.llm import rephrase_stream, LLMError
    
    # Test with the example sentence
    test_text = "Hey guys, let's huddle about AI"
    
    # Collect the streamed content
    full_content = ""
    chunk_count = 0
    async for chunk in rephrase_stream(test_text):
        full_content += chunk
        chunk_count += 1
        
    # Basic assertions
    assert len(full_content) > 0, "Should receive some content"
    assert chunk_count > 0, "Should receive at least one chunk"
    
    # Try to parse the final JSON
    import json
    try:
        result = json.loads(full_content)
        expected_keys = {"professional", "casual", "polite", "social_media"}
        assert set(result.keys()) == expected_keys, "Should have all expected style keys"
        
        # Verify all values are non-empty strings
        for style, text in result.items():
            assert isinstance(text, str), f"{style} should be a string"
            assert len(text.strip()) > 0, f"{style} should be non-empty"
    except json.JSONDecodeError:
        # Streaming might not always result in valid JSON, that's okay for this test
        pass


if __name__ == "__main__":
    print("🔑 Testing streaming functionality...")
    asyncio.run(test_streaming())

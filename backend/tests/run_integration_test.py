#!/usr/bin/env python3
"""
Standalone integration test script for OpenAI API.
This is a simple alternative to running pytest integration tests.
Run this after setting your OPENAI_API_KEY in a .env file.
"""
import asyncio
import os
import sys
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv('../.env')


async def main():
    """Run integration test."""
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Error: OPENAI_API_KEY not found in environment")
        print("Please create a .env file with: OPENAI_API_KEY=your_key_here")
        print("Or run: make env")
        sys.exit(1)

    try:
        # Import after loading .env
        import sys
        sys.path.insert(0, '..')
        from app.llm import rephrase, LLMError
        
        # Test with a simple sentence
        test_text = "I need help with this project."
        
        print(f"🧪 Testing rephrase function with: '{test_text}'")
        print("Making API call...")
        
        result = await rephrase(test_text)
        
        print("\n✅ API integration successful!")
        print("\nResults:")
        for style, text in result.items():
            print(f"  {style.replace('_', ' ').title()}: {text}")
            
        print(f"\n🎉 Integration test completed successfully!")
        print("💡 Tip: Use 'make test-integration' to run comprehensive integration tests")
            
    except LLMError as e:
        print(f"❌ LLM Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        print(f"Error type: {type(e).__name__}")
        sys.exit(1)


if __name__ == "__main__":
    print("🔑 API key found, testing integration...")
    asyncio.run(main())

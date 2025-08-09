"""
Integration tests for OpenAI API functionality.
These tests require a valid OPENAI_API_KEY in the environment.
"""
import os
import pytest
from unittest.mock import patch
from app.llm import rephrase, LLMError


@pytest.mark.asyncio
@pytest.mark.integration
async def test_rephrase_with_real_api():
    """Test the rephrase function with real OpenAI API (requires API key)."""
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        pytest.skip("OPENAI_API_KEY not found - skipping integration test")
    
    # Test with a simple sentence
    test_text = "I need help with this project."
    
    try:
        result = await rephrase(test_text)
        
        # Verify the result has all expected keys
        expected_keys = {"professional", "casual", "polite", "social_media"}
        assert set(result.keys()) == expected_keys
        
        # Verify all values are non-empty strings
        for style, text in result.items():
            assert isinstance(text, str)
            assert len(text.strip()) > 0
            
        # Print results for manual verification
        print(f"\n✅ Integration test successful for: '{test_text}'")
        print("Results:")
        for style, text in result.items():
            print(f"  {style}: {text}")
            
    except LLMError as e:
        pytest.fail(f"LLM Error during integration test: {e}")


@pytest.mark.asyncio
async def test_rephrase_empty_input():
    """Test that empty input raises appropriate error."""
    with pytest.raises(LLMError, match="Input text is empty"):
        await rephrase("")


@pytest.mark.asyncio
async def test_rephrase_whitespace_input():
    """Test that whitespace-only input raises appropriate error."""
    with pytest.raises(LLMError, match="Input text is empty"):
        await rephrase("   \n\t  ")


@pytest.mark.asyncio
@patch('app.llm._client')
async def test_rephrase_api_timeout_error(mock_client):
    """Test handling of API timeout errors."""
    from openai import APITimeoutError
    
    # Mock the client to raise a timeout error
    mock_client.return_value.chat.completions.create.side_effect = APITimeoutError("Timeout")
    
    with pytest.raises(LLMError, match="The LLM request timed out"):
        await rephrase("Test text")


@pytest.mark.asyncio
@patch('app.llm._client')
async def test_rephrase_api_connection_error(mock_client):
    """Test handling of API connection errors."""
    from openai import APIConnectionError
    
    # Mock the client to raise a connection error
    mock_client.return_value.chat.completions.create.side_effect = APIConnectionError("Connection failed")
    
    with pytest.raises(LLMError, match="Network problem reaching the LLM provider"):
        await rephrase("Test text")


@pytest.mark.asyncio
@patch('app.llm._client')
async def test_rephrase_invalid_json_response(mock_client):
    """Test handling of invalid JSON responses."""
    from unittest.mock import MagicMock
    
    # Mock a response with invalid JSON
    mock_response = MagicMock()
    mock_response.choices = [MagicMock()]
    mock_response.choices[0].message.content = "This is not valid JSON"
    
    mock_client.return_value.chat.completions.create.return_value = mock_response
    
    with pytest.raises(LLMError, match="Model returned invalid JSON"):
        await rephrase("Test text")


@pytest.mark.asyncio
@patch('app.llm._client')
async def test_rephrase_successful_mock(mock_client):
    """Test successful rephrase with mocked API response."""
    from unittest.mock import MagicMock
    import json
    
    # Mock a successful response
    mock_response = MagicMock()
    mock_response.choices = [MagicMock()]
    
    test_result = {
        "professional": "I require assistance with this project.",
        "casual": "Could use some help on this project.",
        "polite": "I would appreciate assistance with this project.",
        "social_media": "Need help with this project! 🙏"
    }
    
    mock_response.choices[0].message.content = json.dumps(test_result)
    mock_client.return_value.chat.completions.create.return_value = mock_response
    
    result = await rephrase("I need help with this project.")
    
    assert result == test_result

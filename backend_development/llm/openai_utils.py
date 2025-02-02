import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_client():
    """Get a new OpenAI client instance."""
    return OpenAI(
        api_key=os.getenv('OPENAI_API_KEY'),
        organization=os.getenv('OPENAI_ORGANIZATION')
    )

def call_gpt(text, system_prompt="", model="gpt-4o-mini", temperature=0.0):
    """
    Call GPT model with text and system prompt.
    
    Args:
        text (str): The text to process
        system_prompt (str): Optional system prompt
        model (str): Model to use (default: gpt-4o-mini)
        temperature (float): Temperature parameter (default: 0.0)
    
    Returns:
        str: The model's response
    """
    try:
        client = get_client()
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text}
            ],
            temperature=temperature
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling GPT: {str(e)}")
        return ""


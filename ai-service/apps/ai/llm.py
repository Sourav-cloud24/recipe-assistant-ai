from langchain_google_genai import ChatGoogleGenerativeAI
from apps.config import settings

llm = ChatGoogleGenerativeAI(
    model= "gemini-2.5-flash",
    google_api_key=settings.gemini_api_key,
    temperature=0.7,
)
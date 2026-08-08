from fastapi import FastAPI
from apps.config import settings
from apps.routes.recipe_routes import router as recipe_router

app = FastAPI(
    title="AI Recipe Generator Service",
    version="1.0.0",
)

app.include_router(recipe_router)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ai-recipe-service",
    }
from fastapi import APIRouter, HTTPException
from apps.schemas.recipe_schema import GenerateRecipeRequest, RecipeResponse
from apps.services.recipe_service import generate_recipe

router = APIRouter(
    prefix="/api/v1/recipes",
    tags=["Recipes"],
)

@router.post("/generate", response_model=RecipeResponse)
def generate_recipe_endpoint(request: GenerateRecipeRequest):
    try:
        return generate_recipe(request)

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="Failed to generate recipe",
        ) from error
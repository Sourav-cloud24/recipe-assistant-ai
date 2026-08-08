from apps.schemas.recipe_schema import GenerateRecipeRequest, RecipeResponse
from apps.ai.llm import llm

def generate_recipe(request: GenerateRecipeRequest) -> RecipeResponse:
    prompt = f"""
    Create a recipe using the following information.

    Ingredients: {', '.join(request.ingredients)}

    Cuisine: {request.cuisine or 'Any'}

    Diet: {request.diet or 'Any'}

    Servings: {request.servings}

    Max Cooking Time: {request.max_cooking_time or 'No limit'}

    Create a practical recipe using the available ingredients.
    """
    structured_llm = llm.with_structured_output(RecipeResponse)

    response = structured_llm.invoke(prompt)

    return response


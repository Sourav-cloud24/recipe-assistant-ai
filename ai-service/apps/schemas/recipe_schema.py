from pydantic import BaseModel, Field
from typing import Optional


class GenerateRecipeRequest(BaseModel):
    ingredients: list[str] = Field(min_length=1)
    cuisine: Optional[str] = None
    diet: Optional[str] = None
    servings: int = Field(default=2, ge=1, le=20)
    max_cooking_time: Optional[int] = Field(default=None, ge=1)


class RecipeIngredient(BaseModel):
    name: str
    quantity: str
    unit: str


class Nutrition(BaseModel):
    calories: Optional[int] = None
    protein: Optional[float] = None
    carbohydrates: Optional[float] = None
    fat: Optional[float] = None


class RecipeResponse(BaseModel):
    title: str
    description: str
    ingredients: list[RecipeIngredient]
    instructions: list[str]
    cooking_time: int
    servings: int
    nutrition: Optional[Nutrition] = None
    tips: list[str] = Field(default_factory=list)
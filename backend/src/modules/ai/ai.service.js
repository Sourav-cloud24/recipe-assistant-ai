const AI_SERVICE_URL = process.env.AI_SERVICE_URL 

export const generateRecipe = async (data) => {
    try {
        const response = await fetch(`${AI_SERVICE_URL}/api/v1/recipes/generate`,  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.error("Error generating recipe:", error)
        throw new Error("Failed to generate recipe")
    }
}



//temporary function to test the AI service
// generateRecipe({ ingredients: ["chicken", "rice", "broccoli"],
//     cuisine: "Asian",
//     diet: "gluten-free",
//     servings: 2,
//     max_cooking_time: 30
//  })
//  .then((result) => {
//     console.log("AI SERVICE RESPONSE:", result);
//   })
//   .catch((error) => {
//     console.error("AI SERVICE ERROR:", error);
//   });
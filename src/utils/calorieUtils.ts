import { fetchFoodNutrition } from "@/api/nutritionService";
import { filterFoodNutritionByDate } from "./foodUtils";

export const calculateTotalCalories = async (
  userId: string,
  date: Date,
): Promise<number> => {
  try {
    const foodNutritionData = await fetchFoodNutrition(userId);
    const filteredNutrition = filterFoodNutritionByDate(
      foodNutritionData,
      date,
    );
    return filteredNutrition.reduce((sum, food) => sum + food.calories, 0);
  } catch (error) {
    console.error("Error calculating total calories:", error);
    return 0;
  }
};

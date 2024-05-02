import { FoodNutrition } from "@/types";

export const filterFoodNutritionByDate = (
  foodNutritionData: FoodNutrition[],
  selectedDate: Date,
): FoodNutrition[] => {
  return foodNutritionData.filter((foodNutrition) => {
    const foodNutritionDate = new Date(foodNutrition.consumed_at);
    return (
      foodNutritionDate.getFullYear() === selectedDate.getFullYear() &&
      foodNutritionDate.getMonth() === selectedDate.getMonth() &&
      foodNutritionDate.getDate() === selectedDate.getDate()
    );
  });
};

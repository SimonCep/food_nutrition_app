import { fetchFoodNutrition } from "@/api/nutritionService";
import { fetchExercises } from "@/api/exerciseService";
import { filterFoodNutritionByDate } from "./foodUtils";
import { filterExercisesByDate } from "./exerciseUtils";

export const calculateTotalFoodCalories = async (
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
    console.error("Error calculating total food calories:", error);
    return 0;
  }
};

export const calculateTotalExerciseCalories = async (
  userId: string,
  date: Date,
): Promise<number> => {
  try {
    const exerciseData = await fetchExercises(userId);
    const filteredExercises = filterExercisesByDate(exerciseData, date);
    return filteredExercises.reduce(
      (sum, exercise) => sum + exercise.calories,
      0,
    );
  } catch (error) {
    console.error("Error calculating total exercise calories:", error);
    return 0;
  }
};

export const calculateNetCalories = async (
  userId: string,
  date: Date,
): Promise<number> => {
  const totalFoodCalories = await calculateTotalFoodCalories(userId, date);
  const totalExerciseCalories = await calculateTotalExerciseCalories(
    userId,
    date,
  );
  return totalFoodCalories - totalExerciseCalories;
};

import { Exercise } from "@/types";
import { fetchExercises } from "@/api/exerciseService";

export const filterExercisesByDate = (
  exercises: Exercise[],
  selectedDate: Date,
): Exercise[] => {
  return exercises.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);
    return (
      exerciseDate.getFullYear() === selectedDate.getFullYear() &&
      exerciseDate.getMonth() === selectedDate.getMonth() &&
      exerciseDate.getDate() === selectedDate.getDate()
    );
  });
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

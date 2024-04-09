import { Exercise } from "@/types";

export const filterExercisesByDate = (
  exercises: Exercise[],
  selectedDate: Date,
) => {
  return exercises.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);
    return (
      exerciseDate.getFullYear() === selectedDate.getFullYear() &&
      exerciseDate.getMonth() === selectedDate.getMonth() &&
      exerciseDate.getDate() === selectedDate.getDate()
    );
  });
};

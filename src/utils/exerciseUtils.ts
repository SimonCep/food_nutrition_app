import { Exercise } from "@/types";

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

export const filterExercisesByWeek = (exercises: Exercise[]): Exercise[] => {
  const today = new Date();
  const currentDay = today.getUTCDay();
  const startOfWeek = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - currentDay + (currentDay === 0 ? -6 : 1),
    ),
  );
  const endOfWeek = new Date(
    Date.UTC(
      startOfWeek.getUTCFullYear(),
      startOfWeek.getUTCMonth(),
      startOfWeek.getUTCDate() + 6,
    ),
  );

  return exercises.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);
    return exerciseDate >= startOfWeek && exerciseDate < endOfWeek;
  });
};

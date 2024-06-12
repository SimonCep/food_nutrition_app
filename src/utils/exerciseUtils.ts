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
  const currentDay = today.getDay();

  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - (currentDay === 0 ? 6 : currentDay - 1),
    0,
    0,
    0, // Set time to midnight
  );

  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (7 - currentDay),
    23,
    59,
    59,
  );

  return exercises.filter((exercise) => {
    const exerciseDate = new Date(exercise.created_at);
    return exerciseDate >= startOfWeek && exerciseDate <= endOfWeek;
  });
};

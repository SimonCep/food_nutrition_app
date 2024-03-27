import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import * as Yup from "yup";
import { Tables } from "@/types";

export const addExerciseValidationSchema = Yup.object().shape({
  exercise: Yup.string().required("Exercise name is required"),
  duration: Yup.number()
    .min(1, "Duration must be at least 1 minute")
    .required("Duration is required"),
  calories: Yup.number()
    .min(1, "Calories must be at least 1")
    .required("Calories are required"),
});

export const addExercise = async (
  exercise: string,
  duration: number,
  calories: number,
  userId: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
    setIsLoading(true);
    await addExerciseValidationSchema.validate({
      exercise,
      duration,
      calories,
    });
    const { error } = await supabase
      .from("exercises")
      .insert({ exercise, duration, calories, user_id: userId });
    if (error) {
      throw error;
    }
    onSuccess();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert("Validation Error", error.message);
    } else {
      console.error("Error adding exercise:", error);
      Alert.alert("Error", "An error occurred while adding the exercise.");
    }
  } finally {
    setIsLoading(false);
  }
};

export const fetchExercises = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return data as Tables<"exercises">[];
  } catch (error) {
    console.error("Error fetching exercises:", error);
    Alert.alert("Error", "An error occurred while fetching exercises.");
    return [];
  }
};

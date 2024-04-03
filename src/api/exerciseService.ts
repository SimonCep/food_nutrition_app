import { Alert } from "react-native";
import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { addExerciseValidationSchema } from "@/utils/validationSchemas";

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
      console.error("Error adding exercise:", error);
      Alert.alert("Error", "An error occurred while adding the exercise.");
      return;
    }
    onSuccess();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert("Validation Error", error.message);
    } else {
      console.error("Error adding exercise:", error);
      Alert.alert("Error", "An unexpected error occurred.");
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
      console.error("Error fetching exercises:", error);
      Alert.alert("Error", "An error occurred while fetching exercises.");
      return [];
    }

    return data as Tables<"exercises">[];
  } catch (error) {
    console.error("Error fetching exercises:", error);
    Alert.alert("Error", "An unexpected error occurred.");
    return [];
  }
};

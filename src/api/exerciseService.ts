import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { addExerciseValidationSchema } from "@/utils/validationSchemas";

export const addExercise = async (
  exercise: string,
  duration: number,
  calories: number,
  userId: string,
  selectedDate: string,
) => {
  try {
    await addExerciseValidationSchema.validate({
      exercise,
      duration,
      calories,
    });

    const { error } = await supabase.from("exercises").insert({
      exercise,
      duration,
      calories,
      user_id: userId,
      created_at: selectedDate,
    });

    if (error) {
      console.error("Error adding exercise:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error adding exercise:", error);
    } else {
      console.error("Error adding exercise:", error);
    }
    return false;
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
      return [];
    }

    return data as Tables<"exercises">[];
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

export const deleteExercise = async (exerciseId: number) => {
  try {
    const { error } = await supabase
      .from("exercises")
      .delete()
      .eq("id", exerciseId);

    if (error) {
      console.error("Error deleting exercise:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return false;
  }
};

export const updateExercise = async (
  exerciseId: number,
  exercise: string,
  duration: number,
  calories: number,
  selectedDate: string,
) => {
  try {
    await addExerciseValidationSchema.validate({
      exercise,
      duration,
      calories,
    });

    const { error } = await supabase
      .from("exercises")
      .update({
        exercise,
        duration,
        calories,
        created_at: selectedDate,
      })
      .eq("id", exerciseId);

    if (error) {
      console.error("Error updating exercise:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating exercise:", error);
    } else {
      console.error("Error updating exercise:", error);
    }
    return false;
  }
};

import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { userWeightValidationSchema } from "@/utils/validationSchemas";

export const insertUserWeight = async (
  userId: string,
  weight: number,
  unit: string,
) => {
  try {
    await userWeightValidationSchema.validate({ weight, unit });

    const { error } = await supabase.from("user_weight").insert([
      {
        user_id: userId,
        weight,
        unit,
      },
    ]);

    if (error) {
      console.error("Error inserting user weight:", error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error:", error);
    } else {
      console.error("Error inserting user weight:", error);
    }
    return false;
  }
};

export const fetchUserWeight = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_weight")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching user weight:", error);
      return null;
    }

    return data as Tables<"user_weight">;
  } catch (error) {
    console.error("Error fetching user weight:", error);
    return null;
  }
};

export const updateUserWeight = async (
  userId: string,
  weight: number | undefined,
  unit: string | undefined,
) => {
  try {
    await userWeightValidationSchema.validate({ weight, unit });

    const { error } = await supabase
      .from("user_weight")
      .update({
        weight,
        unit,
      })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error updating user weight:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating user weight:", error);
    } else {
      console.error("Error updating user weight:", error);
    }
    return false;
  }
};

import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { userHeightValidationSchema } from "@/utils/validationSchemas";

export const insertUserHeight = async (
  userId: string,
  height: number,
  unit: string,
) => {
  try {
    await userHeightValidationSchema.validate({ height, unit });

    const { error } = await supabase.from("user_height").insert([
      {
        user_id: userId,
        height,
        unit,
      },
    ]);

    if (error) {
      console.error("Error inserting user height:", error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error:", error);
    } else {
      console.error("Error inserting user height:", error);
    }
    return false;
  }
};

export const fetchUserHeight = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_height")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching user height:", error);
      return null;
    }

    return data as Tables<"user_height">;
  } catch (error) {
    console.error("Error fetching user height:", error);
    return null;
  }
};

export const updateUserHeight = async (
  userId: string,
  height: number | undefined,
  unit: string | undefined,
) => {
  try {
    await userHeightValidationSchema.validate({ height, unit });

    const { error } = await supabase
      .from("user_height")
      .update({
        height,
        unit,
      })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error updating user height:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating user height:", error);
    } else {
      console.error("Error updating user height:", error);
    }
    return false;
  }
};

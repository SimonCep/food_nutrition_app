import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { personalDataValidationSchema } from "@/utils/validationSchemas";

export const insertPersonalData = async (
  userId: string,
  height: number,
  weight: number,
  age: number,
  gender: string,
  healthIssues: string[],
) => {
  try {
    await personalDataValidationSchema.validate({
      height,
      weight,
      age,
      gender,
      healthIssues,
    });

    const { error } = await supabase.from("personal_data").insert([
      {
        user_id: userId,
        height,
        weight,
        age,
        gender,
        health_issues: healthIssues,
      },
    ]);

    if (error) {
      console.error("Error inserting personal data:", error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error:", error);
    } else {
      console.error("Error inserting personal data:", error);
    }
    return false;
  }
};

export const fetchPersonalData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("personal_data")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching personal data:", error);
      return null;
    }

    return data as Tables<"personal_data">;
  } catch (error) {
    console.error("Error fetching personal data:", error);
    return null;
  }
};

export const updatePersonalData = async (
  userId: string,
  height: number | undefined,
  weight: number | undefined,
  age: number | undefined,
  gender: string | undefined,
  healthIssues: string[] | undefined,
) => {
  try {
    await personalDataValidationSchema.validate({
      height,
      weight,
      age,
      gender,
      healthIssues,
    });

    const { error } = await supabase
      .from("personal_data")
      .update({
        height,
        weight,
        age,
        gender,
        health_issues: healthIssues,
      })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating personal data:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating personal data:", error);
    } else {
      console.error("Error updating personal data:", error);
    }
    return false;
  }
};

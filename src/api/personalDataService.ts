import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
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

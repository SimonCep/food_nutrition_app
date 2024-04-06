import * as Yup from "yup";

import { Tables } from "@/types";
import { supabase } from "@/lib/supabase";
import { updateProfileValidationSchema } from "@/utils/validationSchemas";

export const updateProfile = async (
  userId: string,
  data: Partial<Tables<"profiles">>,
) => {
  try {
    await updateProfileValidationSchema.validate(data);

    const { error } = await supabase
      .from("profiles")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating profile:", error);
    } else {
      console.error("Error updating profile:", error);
    }
    return false;
  }
};

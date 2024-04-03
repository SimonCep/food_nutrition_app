import { Tables } from "@/types";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import * as Yup from "yup";
import { updateProfileValidationSchema } from "@/utils/validationSchemas";

export const updateProfile = async (
  userId: string,
  data: Partial<Tables<"profiles">>,
) => {
  try {
    await updateProfileValidationSchema.validate(data);

    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);

    if (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating the profile.");
      return false;
    }

    Alert.alert("Success", "Profile saved successfully!");
    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert("Validation Error", error.message);
    } else {
      console.error("Update profile error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
    return false;
  }
};

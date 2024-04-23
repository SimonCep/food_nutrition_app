import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { addWaterConsumptionValidationSchema } from "@/utils/validationSchemas";

export const addWaterConsumption = async (
  amount: number,
  unit: string,
  userId: string,
  selectedDate: string,
) => {
  try {
    await addWaterConsumptionValidationSchema.validate({ amount, unit });
    const { error } = await supabase.from("water_consumption").insert({
      amount,
      unit,
      user_id: userId,
      consumed_at: selectedDate,
    });

    if (error) {
      console.error("Error adding water consumption:", error);
      return null;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error adding water consumption:", error);
    } else {
      console.error("Error adding water consumption:", error);
    }
    return null;
  }
};

export const fetchWaterConsumption = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("water_consumption")
      .select("*")
      .eq("user_id", userId)
      .order("consumed_at", { ascending: false });

    if (error) {
      console.error("Error fetching water consumption:", error);
      return [];
    }

    return data as Tables<"water_consumption">[];
  } catch (error) {
    console.error("Error fetching water consumption:", error);
    return [];
  }
};

export const deleteWaterConsumption = async (recordId: number) => {
  try {
    const { error } = await supabase
      .from("water_consumption")
      .delete()
      .eq("id", recordId);

    if (error) {
      console.error("Error deleting water consumption:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting water consumption:", error);
    return false;
  }
};

export const updateWaterConsumption = async (
  recordId: number,
  amount: number,
  unit: string,
  selectedDate: string,
) => {
  try {
    await addWaterConsumptionValidationSchema.validate({ amount, unit });

    const { error } = await supabase
      .from("water_consumption")
      .update({
        amount,
        unit,
        consumed_at: selectedDate,
      })
      .eq("id", recordId);

    if (error) {
      console.error("Error updating water consumption:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating water consumption:", error);
    } else {
      console.error("Error updating water consumption:", error);
    }
    return false;
  }
};

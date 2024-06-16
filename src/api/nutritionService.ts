import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { addFoodNutritionValidationSchema } from "@/utils/validationSchemas";

export const addFoodNutrition = async (
  userId: string,
  brand: string | null,
  foodName: string,
  selectedDate: string,
  measurementUnit: string,
  servingSize: number,
  calories: number,
  fat: number | null,
  saturatedFat: number | null,
  polyunsaturatedFat: number | null,
  monounsaturatedFat: number | null,
  transFat: number | null,
  cholesterol: number | null,
  sodium: number | null,
  potassium: number | null,
  carbohydrates: number | null,
  fiber: number | null,
  sugar: number | null,
  addedSugars: number | null,
  sugarAlcohols: number | null,
  protein: number | null,
  vitaminA: number | null,
  vitaminC: number | null,
  vitaminD: number | null,
  calcium: number | null,
  iron: number | null,
) => {
  try {
    await addFoodNutritionValidationSchema.validate({
      foodName,
      servingSize,
      measurementUnit,
      calories,
    });
    const { error } = await supabase.from("nutrition").insert({
      brand,
      food_name: foodName,
      consumed_at: selectedDate,
      measurement_unit: measurementUnit,
      serving_size: Math.round(servingSize),
      calories: Math.round(calories),
      fat: fat !== null ? Math.round(fat) : null,
      saturated_fat: saturatedFat !== null ? Math.round(saturatedFat) : null,
      polyunsaturated_fat:
        polyunsaturatedFat !== null ? Math.round(polyunsaturatedFat) : null,
      monounsaturated_fat:
        monounsaturatedFat !== null ? Math.round(monounsaturatedFat) : null,
      trans_fat: transFat !== null ? Math.round(transFat) : null,
      cholesterol: cholesterol !== null ? Math.round(cholesterol) : null,
      sodium: sodium !== null ? Math.round(sodium) : null,
      potassium: potassium !== null ? Math.round(potassium) : null,
      carbohydrates: carbohydrates !== null ? Math.round(carbohydrates) : null,
      fiber: fiber !== null ? Math.round(fiber) : null,
      sugar: sugar !== null ? Math.round(sugar) : null,
      added_sugars: addedSugars !== null ? Math.round(addedSugars) : null,
      sugar_alcohols: sugarAlcohols !== null ? Math.round(sugarAlcohols) : null,
      protein: protein !== null ? Math.round(protein) : null,
      vitamin_a: vitaminA !== null ? Math.round(vitaminA) : null,
      vitamin_c: vitaminC !== null ? Math.round(vitaminC) : null,
      vitamin_d: vitaminD !== null ? Math.round(vitaminD) : null,
      calcium: calcium !== null ? Math.round(calcium) : null,
      iron: iron !== null ? Math.round(iron) : null,
      user_id: userId,
    });

    if (error) {
      console.error("Error adding food nutrition:", error);
      return null;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error adding food nutrition:", error);
    } else {
      console.error("Error adding food nutrition:", error);
    }
    return null;
  }
};

export const fetchFoodNutrition = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("nutrition")
      .select("*")
      .eq("user_id", userId)
      .order("consumed_at", { ascending: false });

    if (error) {
      console.error("Error fetching food nutrition:", error);
      return [];
    }

    return data as Tables<"nutrition">[];
  } catch (error) {
    console.error("Error fetching food nutrition:", error);
    return [];
  }
};

export const deleteFoodNutrition = async (foodId: number) => {
  try {
    const { error } = await supabase
      .from("nutrition")
      .delete()
      .eq("id", foodId);

    if (error) {
      console.error("Error deleting food nutrition:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting food nutrition:", error);
    return false;
  }
};

export const updateFoodNutrition = async (
  foodId: number,
  brand: string | null,
  foodName: string,
  selectedDate: string,
  measurementUnit: string,
  servingSize: number,
  calories: number,
  fat: number | null,
  saturatedFat: number | null,
  polyunsaturatedFat: number | null,
  monounsaturatedFat: number | null,
  transFat: number | null,
  cholesterol: number | null,
  sodium: number | null,
  potassium: number | null,
  carbohydrates: number | null,
  fiber: number | null,
  sugar: number | null,
  addedSugars: number | null,
  sugarAlcohols: number | null,
  protein: number | null,
  vitaminA: number | null,
  vitaminC: number | null,
  vitaminD: number | null,
  calcium: number | null,
  iron: number | null,
) => {
  try {
    await addFoodNutritionValidationSchema.validate({
      foodName,
      servingSize,
      measurementUnit,
      calories,
    });

    const { error } = await supabase
      .from("nutrition")
      .update({
        brand,
        food_name: foodName,
        consumed_at: selectedDate,
        measurement_unit: measurementUnit,
        serving_size: servingSize,
        calories,
        fat,
        saturated_fat: saturatedFat,
        polyunsaturated_fat: polyunsaturatedFat,
        monounsaturated_fat: monounsaturatedFat,
        trans_fat: transFat,
        cholesterol,
        sodium,
        potassium,
        carbohydrates,
        fiber,
        sugar,
        added_sugars: addedSugars,
        sugar_alcohols: sugarAlcohols,
        protein,
        vitamin_a: vitaminA,
        vitamin_c: vitaminC,
        vitamin_d: vitaminD,
        calcium,
        iron,
      })
      .eq("id", foodId);

    if (error) {
      console.error("Error updating food nutrition:", error);
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error updating food nutrition:", error);
    } else {
      console.error("Error updating food nutrition:", error);
    }
    return false;
  }
};

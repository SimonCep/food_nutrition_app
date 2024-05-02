import * as Yup from "yup";

import { Database } from "@/database.types";
import { Session } from "@supabase/supabase-js";

export interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  colorScheme: ColorScheme;
  validationErrors: Yup.ValidationError | null;
}

export interface SignUpFormProps {
  username: string;
  setUsername: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  colorScheme: ColorScheme;
  validationErrors: Yup.ValidationError | null;
}

export type AuthData = {
  session: Session | null;
  profile: Tables<"profiles"> | null;
  loading: boolean;
  updateProfileData: (userId: string) => Promise<void>;
};

// Exercise-related types
export type Exercise = Tables<"exercises">;

export interface ExerciseFormProps {
  exercise: string;
  setExercise: (exercise: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  calories: number;
  setCalories: (calories: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  validationErrors: Yup.ValidationError | null;
  isEditing: boolean;
}

export interface ExerciseSectionProps {
  userId: string;
  selectedDate: Date;
}

// Water consumption related types
export type WaterConsumption = Tables<"water_consumption">;

export interface WaterFormProps {
  amount: number;
  setAmount: (amount: number) => void;
  unit: string;
  setUnit: (unit: string) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  validationErrors: Yup.ValidationError | null;
  isEditing: boolean;
}

export type WaterSectionProps = {
  userId: string;
  selectedDate: Date;
};

// Food nutrition related types
export type FoodNutrition = Tables<"nutrition">;

export interface FoodNutritionFormProps {
  brand: string;
  setBrand: (brand: string) => void;
  foodName: string;
  setFoodName: (foodName: string) => void;
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
  measurementUnit: string;
  setMeasurementUnit: (measurementUnit: string) => void;
  servingSize: number;
  setServingSize: (servingSize: number) => void;
  calories: number;
  setCalories: (calories: number) => void;
  fat: number;
  setFat: (fat: number) => void;
  saturatedFat: number;
  setSaturatedFat: (saturatedFat: number) => void;
  polyunsaturatedFat: number;
  setPolyunsaturatedFat: (polyunsaturatedFat: number) => void;
  monounsaturatedFat: number;
  setMonounsaturatedFat: (monounsaturatedFat: number) => void;
  transFat: number;
  setTransFat: (transFat: number) => void;
  cholesterol: number;
  setCholesterol: (cholesterol: number) => void;
  sodium: number;
  setSodium: (sodium: number) => void;
  potassium: number;
  setPotassium: (potassium: number) => void;
  carbohydrates: number;
  setCarbohydrates: (carbohydrates: number) => void;
  fiber: number;
  setFiber: (fiber: number) => void;
  sugar: number;
  setSugar: (sugar: number) => void;
  addedSugars: number;
  setAddedSugars: (addedSugars: number) => void;
  sugarAlcohols: number;
  setSugarAlcohols: (sugarAlcohols: number) => void;
  protein: number;
  setProtein: (protein: number) => void;
  vitaminA: number;
  setVitaminA: (vitaminA: number) => void;
  vitaminC: number;
  setVitaminC: (vitaminC: number) => void;
  vitaminD: number;
  setVitaminD: (vitaminD: number) => void;
  calcium: number;
  setCalcium: (calcium: number) => void;
  iron: number;
  setIron: (iron: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  validationErrors: Yup.ValidationError | null;
  isEditing: boolean;
}

export interface FoodNutritionSectionProps {
  userId: string;
  selectedDate: Date;
}

// Theme switcher types
export type ColorScheme = "light" | "dark" | undefined;

export interface ThemeSwitchProps {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

export interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  colors: {
    modalBackground: string;
    modalText: string;
    cancelButtonBackground: string;
    cancelButtonBorder: string;
    cancelButtonText: string;
    deleteButtonBackground: string;
    deleteButtonBorder: string;
    deleteButtonText: string;
  };
  recordType: "exercise" | "water";
}

export type DiaryContextType = {
  waterUpdated: boolean;
  setWaterUpdated: (updated: boolean) => void;
  exerciseUpdated: boolean;
  setExerciseUpdated: (updated: boolean) => void;
  foodUpdated: boolean;
  setFoodUpdated: (updated: boolean) => void;
};

// Type helpers
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

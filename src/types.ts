import * as Yup from "yup";

import { Database } from "@/database.types";

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

// Type helpers
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

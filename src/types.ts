import * as Yup from "yup";

import { Database } from "@/database.types";

// Sign-in related types
export interface SignInData {
  email: string;
  password: string;
}

export interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  colorScheme: ColorScheme;
}

// Sign-up related types
export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignUpFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  colorScheme: ColorScheme;
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
  selectedDate: Date; // Add this line
}

// Theme switcher types
export type ColorScheme = "light" | "dark" | undefined;

export interface ThemeSwitchProps {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

// Type helpers
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

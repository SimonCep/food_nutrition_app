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
export interface Exercise {
  id: number;
  exercise: string;
  duration: number;
  calories: number;
  created_at: string;
}

export interface ExerciseFormProps {
  exercise: string;
  setExercise: (exercise: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  calories: number;
  setCalories: (calories: number) => void;
  onAddExercise: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

// Theme switcher types
export type ColorScheme = "light" | "dark" | undefined;

export interface ThemeSwitchProps {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

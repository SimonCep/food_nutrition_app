import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
});

export const signInValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const changeEmailValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email("Invalid email")
    .required("New email is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Password confirmation is required"),
});

export const updateProfileValidationSchema = Yup.object().shape({
  username: Yup.string().min(3, "Username must be at least 3 characters"),
});

export const addExerciseValidationSchema = Yup.object().shape({
  calories: Yup.number()
    .min(1, "Calories must be at least 1")
    .required("Calories are required"),
  duration: Yup.number()
    .min(1, "Duration must be at least 1 minute")
    .required("Duration is required"),
  exercise: Yup.string().required("Exercise name is required"),
});

export const addWaterConsumptionValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
  unit: Yup.string().required("Unit is required"),
});

export const addFoodNutritionValidationSchema = Yup.object().shape({
  foodName: Yup.string().required("Food description is required"),
  servingSize: Yup.number()
    .min(1, "Serving must be at least 1")
    .required("Serving size is required"),
  measurementUnit: Yup.string().required("Measurement unit is required"),
  calories: Yup.number()
    .min(1, "Calories must be at least 1")
    .required("Calories are required"),
});

export const personalDataValidationSchema = Yup.object().shape({
  height: Yup.string().required("Height is required"),
  weight: Yup.string().required("Weight is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number"),
  gender: Yup.string().required("Gender is required"),
  healthIssues: Yup.array()
    .of(Yup.string())
    .required("Health issues are required"),
});

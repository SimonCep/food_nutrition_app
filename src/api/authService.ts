import { Alert } from "react-native";
import * as Yup from "yup";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { Session } from "@supabase/supabase-js";

export const signInValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const signIn = async (
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
    await signInValidationSchema.validate({ email, password });

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      onSuccess();
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert("Validation Error", error.message);
    } else {
      Alert.alert("Error", "An error occurred while signing in.");
      console.error("Sign in error:", error);
    }
  } finally {
    setIsLoading(false);
  }
};

export const signUpValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("Username is required"),
});

export const signUp = async (
  name: string,
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
    await signUpValidationSchema.validate({ name, email, password });

    setIsLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else if (user?.id) {
      // Update the user's profile with the entered name as the username
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: name })
        .eq("id", user.id);

      if (updateError) {
        Alert.alert("Error", "Failed to update username");
        console.error("Update username error:", updateError);
      } else {
        Alert.alert(
          "Success",
          "Account created successfully! You can now log in.",
          [{ text: "OK", onPress: () => onSuccess() }],
        );
        await supabase.auth.signOut(); // Sign out the user
      }
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert("Validation Error", error.message);
    } else {
      Alert.alert("Error", "An error occurred while signing up.");
      console.error("Sign up error:", error);
    }
  } finally {
    setIsLoading(false);
  }
};

export const fetchSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const fetchProfile = async (userId: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data as Tables<"profiles"> | null;
};

export const subscribeToAuthStateChange = (
  callback: (event: string, session: Session | null) => void,
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);
  return subscription;
};

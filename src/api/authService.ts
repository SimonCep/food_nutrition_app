import { Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";

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

const updateProfileValidationSchema = Yup.object().shape({
  username: Yup.string().min(3, "Username must be at least 3 characters"),
});

const storeSessionData = async (session: Session | null) => {
  await AsyncStorage.setItem("session", JSON.stringify(session));
  await AsyncStorage.setItem("refreshToken", session?.refresh_token ?? "");
};

export const signIn = async (
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
    await signInValidationSchema.validate({ email, password });
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      handleSignInError(error);
    } else {
      await storeSessionData(data.session);
      onSuccess();
    }
  } catch (error) {
    handleSignInValidationError(error);
  } finally {
    setIsLoading(false);
  }
};

const handleSignInError = (error: any) => {
  Alert.alert("Error", error.message);
};

const handleSignInValidationError = (error: any) => {
  if (error instanceof Yup.ValidationError) {
    Alert.alert("Validation Error", error.message);
  } else {
    Alert.alert("Error", "An error occurred while signing in.");
    console.error("Sign in error:", error);
  }
};

export const signUp = async (
  username: string,
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
    await signUpValidationSchema.validate({ username, email, password });
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      handleSignUpError(error);
    } else if (data.user?.id) {
      await handleProfileUpdate(data.user.id, username, onSuccess);
    }
  } catch (error) {
    handleSignUpValidationError(error);
  } finally {
    setIsLoading(false);
  }
};

const handleSignUpError = (error: any) => {
  Alert.alert("Error", error.message);
};

const handleProfileUpdate = async (
  userId: string,
  username: string,
  onSuccess: () => void,
) => {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ username })
    .eq("id", userId);

  if (updateError) {
    handleUpdateError(updateError);
    await supabase.auth.signOut();
  } else {
    await handleSessionRetrieval(onSuccess);
  }
};

const handleUpdateError = (error: any) => {
  Alert.alert("Error", "Failed to update username");
  console.error("Update username error:", error);
};

const handleSessionRetrieval = async (onSuccess: () => void) => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error retrieving session after sign-up:", error);
  } else {
    await storeSessionData(data.session);
    Alert.alert(
      "Success",
      "Account created successfully! You can now log in.",
      [{ text: "OK", onPress: onSuccess }],
    );
  }
};

const handleSignUpValidationError = (error: any) => {
  if (error instanceof Yup.ValidationError) {
    Alert.alert("Validation Error", error.message);
  } else {
    Alert.alert("Error", "An error occurred while signing up.");
    console.error("Sign up error:", error);
  }
};

export const fetchSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

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
      throw error;
    }

    return true;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert("Validation Error", error.message);
    } else {
      Alert.alert("Error", "An error occurred while updating the profile.");
      console.error("Update profile error:", error);
    }
    return false;
  }
};

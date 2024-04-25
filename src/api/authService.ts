import { Session } from "@supabase/supabase-js";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "@/utils/validationSchemas";

const storeSessionData = async (session: Session | null) => {
  await AsyncStorage.setItem("session", JSON.stringify(session));
  await AsyncStorage.setItem("refreshToken", session?.refresh_token ?? "");
};

export const isSessionExpired = (session: Session | null): boolean => {
  if (!session) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  const expiresAt = session.expires_at ?? 0;

  return currentTime > expiresAt;
};

export const signIn = async (email: string, password: string) => {
  try {
    await signInValidationSchema.validate({ email, password });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
      return false;
    } else {
      await storeSessionData(data.session);
      return true;
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error:", error);
    } else {
      console.error("Sign in error:", error);
    }
    return false;
  }
};

export const signUp = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    await signUpValidationSchema.validate({ username, email, password });

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Error signing up:", error);
      return false;
    } else if (data.user?.id) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", data.user.id);

      if (updateError) {
        console.error("Update username error:", updateError);
        await supabase.auth.signOut();
        return false;
      } else {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error(
            "Error retrieving session after sign-up:",
            sessionError,
          );
          return false;
        } else {
          await storeSessionData(sessionData.session);
          return true;
        }
      }
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.error("Validation error:", error);
    } else {
      console.error("Sign up error:", error);
    }
    return false;
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

export const changeEmail = async (newEmail: string) => {
  try {
    // Check if the user is authenticated
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user) {
      console.error("User not found. Please log in and try again.");
      return false;
    }

    // Step 2: Initiate the email change
    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      console.error("Error initiating email change:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error changing email:", error);
    return false;
  }
};

export const changePassword = async (newPassword: string) => {
  try {
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateError) {
      console.error("Error changing password:", updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    return false;
  }
};

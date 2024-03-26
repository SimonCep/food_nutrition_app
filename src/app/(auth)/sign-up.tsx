import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { supabase } from "@/lib/supabase";
import SignUpForm from "@/components/SignUpForm";

const signUp = async (
  name: string,
  email: string,
  password: string,
  setIsLoading: (isLoading: boolean) => void,
  onSuccess: () => void,
) => {
  try {
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
    Alert.alert("Error", "An error occurred while signing up.");
    console.error("Sign up error:", error);
  } finally {
    setIsLoading(false);
  }
};

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUpSuccess = () => {
    router.push("/sign-in");
  };

  return (
    <View
      className={`${
        colorScheme === "dark" ? "bg-black" : "bg-white"
      } flex-1 justify-center`}
    >
      <View className="flex-1 p-5 justify-center">
        <Stack.Screen
          options={{ title: "Sign up", headerTitleAlign: "center" }}
        />
        <View
          className={`${
            colorScheme === "dark" ? "bg-gray-700" : "bg-white"
          } p-8 rounded-xl shadow-md`}
        >
          <SignUpForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            colorScheme={colorScheme}
          />
          <TouchableOpacity
            onPress={() =>
              signUp(name, email, password, setIsLoading, handleSignUpSuccess)
            }
            disabled={isLoading}
            className={`${
              colorScheme === "dark" ? "bg-yellow-600" : "bg-yellow-400"
            } py-3 rounded-full border-2 ${
              colorScheme === "dark" ? "border-white" : "border-black"
            } mb-4`}
          >
            {isLoading ? (
              <ActivityIndicator
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ) : (
              <Text
                className={`${
                  colorScheme === "dark" ? "text-white" : "text-black"
                } font-bold text-lg text-center`}
              >
                Create account
              </Text>
            )}
          </TouchableOpacity>
          <Link
            href="/sign-in"
            className={`self-center font-bold ${
              colorScheme === "dark" ? "text-white" : "text-black"
            } text-lg`}
          >
            Sign in
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
